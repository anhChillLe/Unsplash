import { Dimensions, StyleSheet } from "react-native"
import { Avatar, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto, SingleTag, TagGroup } from "../../components"
import { useCollection, useCollectionPhotos } from "../../hooks"
import { useAppNavigation, useCollectionPhotosRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { FullCollection, Photo, Tag } from "../../service/unsplash/models"

export default function CollectionPhotos() {
	const route = useCollectionPhotosRoute()
	const width = Dimensions.get("window").width
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useAppNavigation()
	const id = route.params.collection.id
	const { photos, loadMore } = useCollectionPhotos(id)
	const { collection } = useCollection(id)

	const handleItemPress = (photo: Photo, index: number) =>
		navigation.navigate({
			name: Screens.detailPager,
			key: photo.id,
			params: {
				photos: [photo],
				initPosition: index,
			},
			merge: true,
		})

	return (
		<Surface mode="flat" style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListPhoto
				width={width - 16}
				space={4}
				photos={photos}
				header={collection && <ListHeader {...collection} />}
				onItemPress={handleItemPress}
				column={3}
				itemThreshold={9}
				onEndReached={loadMore}
				contentContainerStyle={styles.listContainer}
				showLoadingFooter={(collection?.total_photos ?? 0) > photos.length}
			/>
		</Surface>
	)
}

const ListHeader = (collection: FullCollection) => {
	const navigation = useAppNavigation()

	const {
		user: { username, profile_image, name },
		published_at,
		description,
		tags,
		total_photos,
	} = collection

	const handleTagPress = (tag: Tag) => {
		if (tag.type !== "search") return
		navigation.navigate(Screens.searchResult, { searchInput: { query: tag.title } })
	}

	return (
		<Surface mode="flat" style={styles.headerContainer}>
			<Text variant="headlineLarge" numberOfLines={1} style={styles.title}>
				{collection.title}
			</Text>

			<SingleTag
				avatar={<Avatar.Image size={24} source={{ uri: profile_image.medium }} />}
				onPress={() => navigation.navigate(Screens.user, { username })}
			>
				{name}
			</SingleTag>

			{description && (
				<Text variant="bodyMedium" style={styles.description}>
					{description}
				</Text>
			)}

			<Text style={styles.date}>
				{total_photos} photos · {published_at.formatAsDate()}
			</Text>

			<TagGroup tags={tags} onItemPress={handleTagPress} containerStyle={styles.tags} />
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	listContainer: {
		paddingHorizontal: 8,
	},
	headerContainer: {
		paddingVertical: 4,
	},
	title: {
		fontWeight: "bold",
	},
	description: {
		marginVertical: 4,
	},
	date: {
		fontSize: 12,
		opacity: 0.6,
		marginVertical: 2,
	},
	tags: {
		marginBottom: 4,
	},
})
