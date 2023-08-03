import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Divider, Surface, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar } from "../../components"
import { Screens } from "../../navigations/screen_name"
import ListPhoto from "./list_photo"
import { StyleSheet } from "react-native"

export type PhotosParamList = {
	[Screens.imagesLatest]: undefined
	[Screens.imagesOldest]: undefined
	[Screens.imagesPopular]: undefined
}

const Tab = createMaterialTopTabNavigator<PhotosParamList>()

const ListLatest = () => <ListPhoto order="latest" />
const ListOldest = () => <ListPhoto order="oldest" />
const ListPopular = () => <ListPhoto order="popular" />

export default function TopNavigationListImage() {
	const { top, bottom } = useSafeAreaInsets()
	const primary = useTheme().colors.primary

	const options = {
		tabBarStyle: { backgroundColor: "transparent" },
		tabBarActiveTintColor: primary,
		tabBarIndicatorStyle: { backgroundColor: primary },
		tabBarPressColor: "transparent",
	}

	return (
		<Surface mode="flat" style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<Divider />
			<Tab.Navigator initialRouteName={Screens.imagesLatest} offscreenPageLimit={2} screenOptions={options}>
				<Tab.Screen name={Screens.imagesLatest} component={ListLatest} options={{ title: "Latest" }} />
				<Tab.Screen name={Screens.imagesOldest} component={ListOldest} options={{ title: "Oldest" }} />
				<Tab.Screen name={Screens.imagesPopular} component={ListPopular} options={{ title: "Popular" }} />
			</Tab.Navigator>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
})
