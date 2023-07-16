import { ActivityIndicator, Surface } from "react-native-paper";
import BackAppBar from "../Appbar/BackAppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoadingScreen() {
  const inset = useSafeAreaInsets()

	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
        paddingTop: inset.top,
			}}
		>
			<BackAppBar />
			<ActivityIndicator style={{flex: 1}} size="large" />
		</Surface>
	);
}
