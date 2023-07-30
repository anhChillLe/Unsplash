import { NavigationContext } from "@react-navigation/native"
import { ReactElement, useContext } from "react"
import { StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"
import { useAppNavigation } from "../../navigations/hooks"

export default function BackAppBar() : ReactElement{
	const navigation =useAppNavigation()

	return (
		<Appbar
			elevated={false}
			mode="small"
			safeAreaInsets={{
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			}}
			style={styles.container}
		>
			<Appbar.BackAction onPress={navigation.goBack} />
		</Appbar>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		height: 48,
	},
})
