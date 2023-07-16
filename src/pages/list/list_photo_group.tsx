import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Divider, Surface, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar } from "../../components";
import { ScreenName } from "../../navigations/screen_name";
import ListPhoto from "./list_photo";

export type PhotosParamList = {
	[ScreenName.imagesLatest]: undefined;
	[ScreenName.imagesOldest]: undefined;
	[ScreenName.imagesPopular]: undefined;
};

const Tab = createMaterialTopTabNavigator<PhotosParamList>();

const ListLatest = () => <ListPhoto order="latest" />;
const ListOldest = () => <ListPhoto order="oldest" />;
const ListPopular = () => <ListPhoto order="popular" />;

export default function TopNavigationListImage() {
	const { top, bottom } = useSafeAreaInsets();
	const primary = useTheme().colors.primary;
	return (
		<Surface mode="flat" style={{ flex: 1, height: "100%", paddingTop: top, paddingBottom: bottom }}>
			<BackAppBar />
			<Divider />
			<Tab.Navigator
				initialRouteName={ScreenName.imagesPopular}
				offscreenPageLimit={2}
				screenOptions={{
					tabBarStyle: { backgroundColor: "transparent" },
					tabBarActiveTintColor: primary,
					tabBarIndicatorStyle: { backgroundColor: primary },
					tabBarPressColor: "transparent",
				}}
			>
				<Tab.Screen name={ScreenName.imagesLatest} component={ListLatest} options={{ title: "Latest" }} />
				<Tab.Screen name={ScreenName.imagesOldest} component={ListOldest} options={{ title: "Oldest" }} />
				<Tab.Screen name={ScreenName.imagesPopular} component={ListPopular} options={{ title: "Popular" }} />
			</Tab.Navigator>
		</Surface>
	);
}
