import { NavigationContext } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Avatar, Chip, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto, LoadingScreen, SingleTag, TagGroup } from "../../components"
import { CollectionPhotosRoute } from "../../navigations/param_list"
import { Screens } from "../../navigations/screen_name"
import { FullCollection, Photo, Tag } from "../../service/unsplash/models"
import getCollectionViewmodel, { CollectionViewmodel } from "../../viewmodels/collection_viewmodel"

export default function CollectionPhotosContainer({ route }: CollectionPhotosRoute) {
	const viewModel = getCollectionViewmodel(route.params.collection.id)
	return <CollectionPhotos {...viewModel} />
}

function CollectionPhotos({
	isLoadingDetail,
	isLoadingPhotos,
	photos,
	detail,
	getCollection,
	getPhotos,
}: CollectionViewmodel) {
	const width = Dimensions.get("window").width
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useContext(NavigationContext)

	useEffect(() => {
		getPhotos()
		getCollection()
	}, [])

	if (!detail) return <LoadingScreen />

	// const handleItemPress = (photo: Photo, index: number) =>
	// 	navigation?.navigate({
	// 		name: Screens.detail,
	// 		key: photo.id,
	// 		params: { photo },
	// 		merge: true,
	// 	})

	const handleItemPress = (photo: Photo, index: number) =>
		navigation?.navigate({
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
				header={<ListHeader {...detail} />}
				onItemPress={handleItemPress}
				column={3}
				itemThreshold={9}
				onEndReached={getPhotos}
				contentContainerStyle={styles.listContainer}
			/>
		</Surface>
	)
}

const ListHeader = (collection: FullCollection) => {
	const navigation = useContext(NavigationContext)

	const {
		user: { username, profile_image, name },
		published_at,
		description,
		tags,
		total_photos,
	} = collection

	const handleTagPress = (tag: Tag) => {
		if (tag.type !== "search") return
		navigation?.navigate(Screens.searchResult, { searchInput: { query: tag.title } })
	}

	return (
		<Surface mode="flat" style={styles.headerContainer}>
			<Text variant="headlineLarge" numberOfLines={1} style={styles.title}>
				{collection.title}
			</Text>

			<SingleTag
				avatar={<Avatar.Image size={24} source={{ uri: profile_image.medium }} />}
				onPress={() => navigation?.navigate(Screens.user, { username })}
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
