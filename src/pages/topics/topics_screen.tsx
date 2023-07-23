import { NavigationContext } from "@react-navigation/native"
import { useContext } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { BackAppBar, ListAlbums } from "../../components"
import { Screens } from "../../navigations/screen_name"
import { RootState } from "../../redux/store/store"

export default function TopicScreen() {
	const state = useSelector((state: RootState) => state.topic)
	const { top, bottom } = useSafeAreaInsets()
	const width = Dimensions.get("window").width
	const safeAreaWidth = width - 32
	const navigation = useContext(NavigationContext)

	return (
		<Surface style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListAlbums
				data={state.topics}
				column={1}
				space={8}
				mode="list"
				itemMode="group"
				header={<Header />}
				style={styles.list}
				contentContainerStyle={[styles.listContainer, { paddingBottom: bottom + 16 }]}
				isLoading={state.isLoading}
				width={safeAreaWidth}
				onItemPress={(topic) => {
					console.log(topic.id)
					navigation?.navigate(Screens.topicPhotos, { id_or_slug: topic.id })
				}}
			/>
		</Surface>
	)
}

function Header() {
	return (
		<Text variant="displayLarge" style={styles.heading}>
			Topics
		</Text>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	list:{
		flex: 1
	},

	listContainer: {
		paddingHorizontal: 16,
	},
	heading: {
		fontWeight: "500", marginVertical: 16
	}
})
