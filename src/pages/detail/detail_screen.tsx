import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";
import { Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar } from "../../components";
import { DetailRoute } from "../../navigations/param_list";
import PageContainer from "./image_page";

export default function DetailScreen({ route }: DetailRoute) {
	const photo = route.params.photo;
	const navigation = useContext(NavigationContext);
	const { top } = useSafeAreaInsets();

	return (
		<Surface style={{ flex: 1, height: "100%", paddingTop: top }}>
			<BackAppBar />
			<PageContainer photo={photo} />
		</Surface>
	);
}
