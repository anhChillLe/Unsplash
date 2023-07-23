import { Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar } from "../../components"
import { DetailRoute } from "../../navigations/param_list"
import PageContainer from "./image_page"
import { StyleSheet } from "react-native"

export default function DetailScreen({ route }: DetailRoute) {
	const photo = route.params.photo
	const { top } = useSafeAreaInsets()

	return (
		<Surface key={photo.id} style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<PageContainer photo={photo} />
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
})
