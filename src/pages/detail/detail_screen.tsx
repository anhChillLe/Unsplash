import { StyleSheet } from "react-native"
import { Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar } from "../../components"
import { useDetaiRoute } from "../../navigations/hooks"
import PageContainer from "./image_page"

export default function DetailScreen() {
	const route = useDetaiRoute()
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
