import { Dimensions, StyleSheet } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListAlbums } from "../../components"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { fetchTopics } from "../../redux/features/topic/topics"
import { useAppDispatch, useTopicState } from "../../redux/store/store"
import { BaseGroup } from "../../service/unsplash/models"

export default function TopicScreen() {
	const state = useTopicState()
	const dispatch = useAppDispatch()
	const { top, bottom } = useSafeAreaInsets()
	const width = Dimensions.get("window").width
	const safeAreaWidth = width - 32
	const navigation = useAppNavigation()

	const loadMore = () => dispatch(fetchTopics())
	const handleItemPress = (topic: BaseGroup) => navigation.navigate(Screens.topicPhotos, { id_or_slug: topic.id })

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
				onEndReached={loadMore}
				onItemPress={handleItemPress}
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
