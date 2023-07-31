import { NavigationContext } from "@react-navigation/native"
import React, { useContext } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Avatar, Chip, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto } from "../../components"
import { useTopic, useTopicPhotos } from "../../hooks"
import { useAppNavigation, useTopicPhotosRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { FullTopic, User } from "../../service/unsplash/models"
import "../../ultilities/date_distance"

export default function TopicDetail() {
	const route = useTopicPhotosRoute()
	const width = Dimensions.get("window").width
	const id_or_slug = route.params.id_or_slug

	const { top } = useSafeAreaInsets()
	const navigation = useAppNavigation()
	const {topic} = useTopic(id_or_slug)
	const {photos, loadMore} = useTopicPhotos(id_or_slug)

	return (
		<Surface mode="flat" style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListPhoto
				width={width - 16}
				space={4}
				photos={photos}
				header={topic && <ListHeader {...topic} />}
				onItemPress={(photo, index) => navigation.navigate(Screens.detail, { photo })}
				column={3}
				itemThreshold={9}
				onEndReached={loadMore}
				contentContainerStyle={styles.listContainer}
			/>
		</Surface>
	)
}

const ListHeader = (topic: FullTopic) => {
	const navigation = useAppNavigation()
	const { title, owners, description, total_photos } = topic

	  // Remove <p></p>
		const cleanedText = description?.replace(/<p>.*?<\/p>/g, '')?.trim()

	return (
		<Surface mode="flat" style={styles.headerContainer}>
			<Text variant="headlineLarge" numberOfLines={1} style={styles.heading}>
				{title}
			</Text>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.owners}>
				{owners.map((user: User) => (
					<Chip
						key={user.id}
						avatar={<Avatar.Image size={24} source={{ uri: user.profile_image.medium }} />}
						onPress={() => navigation.navigate(Screens.user, { username: user.username })}
					>
						{user.name}
					</Chip>
				))}
			</ScrollView>

			{description && (
				<Text variant="bodyMedium" style={styles.description}>
					{cleanedText}
				</Text>
			)}

			<Text style={styles.subscription}>
				{total_photos} photos · {topic.published_at.formatAsDate()}
			</Text>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	headerContainer: {
		paddingTop: 4,
		paddingBottom: 4,
	},
	listContainer: {
		paddingHorizontal: 8
	},
	heading: {
		fontWeight: "bold",
	},
	owners: {
		marginTop: 4,
	},
	description: {
		marginTop: 4,
	},
	subscription: {
		fontSize: 12,
		opacity: 0.6,
		marginTop: 4,
	},
})
