import { LinkingOptions, NavigationContainer, useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import RNBootSplash from "react-native-bootsplash"
import { useDispatch, useSelector } from "react-redux"
import { LoadingScreen } from "../components"
import { getToken } from "../redux/features/auth/action"
import { AppDispatch, RootState } from "../redux/store/store"
import AppStack from "./app_stack"
import AuthStack from "./auth_stack"
import { AuthParamList } from "./param_list"
import { ScreenName } from "./screen_name"

export default function RootStack() {
	const state = useSelector((state: RootState) => state.auth)

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(getToken())
	}, [])

	if (state.isGettingToken) return <LoadingScreen />

	return (
		<NavigationContainer linking={linking} onReady={RNBootSplash.hide}>
			{state.token ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

const linking: LinkingOptions<AuthParamList> = {
	prefixes: ["unsplash://"],
	config: {
		screens: {
			[ScreenName.login]: "app/login_request",
			[ScreenName.loginResult]: "app/login_success",
		},
	},
}
