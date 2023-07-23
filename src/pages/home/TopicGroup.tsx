import { useSelector } from "react-redux"
import { RootState } from "../../redux/store/store"
import { useContext } from "react"
import { NavigationContext } from "@react-navigation/native"
import { GroupHeading, ListAlbums } from "../../components"
import { Screens } from "../../navigations/screen_name"
import { StyleSheet } from "react-native"
import { BaseGroup } from "../../service/unsplash/models"

export default function TopicGroup({ width }: { width: number }) {
	const topicsState = useSelector((state: RootState) => state.topic)
	const navigation = useContext(NavigationContext)

	const handleMorePress = () => navigation?.navigate(Screens.topics)
	const handleTopicPress = (topic: BaseGroup) => navigation?.navigate(Screens.topicPhotos, { id_or_slug: topic.id })

	return (
		<>
			<GroupHeading containerStyle={styles.heading} onMorePress={handleMorePress}>
				Hot topics
			</GroupHeading>
			<ListAlbums
				data={topicsState.topics}
				column={2}
				space={8}
				maxItems={4}
				isLoading={topicsState.isLoading}
				onItemPress={handleTopicPress}
				mode="compact"
				width={width}
				style={styles.listTopicContainer}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	heading: {
		marginTop: 32,
	},
	listTopicContainer: {
		marginTop: 12,
	},
})
