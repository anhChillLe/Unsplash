import "../../ultilities/date_distance"
import { NavigationContext } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { Dimensions, View } from "react-native"
import { Avatar, Chip, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListImageLite, LoadingScreen } from "../../components"
import { CollectionPhotosRoute } from "../../navigations/param_list"
import { ScreenName } from "../../navigations/screen_name"
import { FullCollection } from "../../unsplash/models"
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

	return (
		<Surface mode="flat" style={{ flex: 1, height: "100%", paddingTop: top }}>
			<BackAppBar />
			<ListImageLite
				width={width - 16}
				space={4}
				photos={photos}
				header={<ListHeader collection={detail} />}
				onItemPress={(photo, index) =>
					navigation?.navigate({
						name: ScreenName.detail,
						key: photo.id,
						params: {
							photo,
						},
						merge: true,
					})
				}
				//
				column={3}
				itemThreshold={6}
				onEndReached={getPhotos}
				contentContainerStyle={{
					paddingHorizontal: 8,
				}}
			/>
		</Surface>
	)
}

const ListHeader = ({ collection }: { collection: FullCollection }) => {
	const navigation = useContext(NavigationContext)

	const {
		user: { username, profile_image, name },
		published_at,
		description,
		tags,
		total_photos,
	} = collection

	return (
		<Surface mode="flat" style={{ paddingVertical: 4 }}>
			<Text variant="headlineLarge" numberOfLines={1} style={{ fontWeight: "bold" }}>
				{collection.title}
			</Text>

			<View style={{ flexDirection: "row" }}>
				<Chip
					avatar={<Avatar.Image size={24} source={{ uri: profile_image.medium }} />}
					onPress={() => navigation?.navigate(ScreenName.user, { username })}
				>
					{name}
				</Chip>
			</View>

			{collection.description && (
				<Text variant="bodyMedium" style={{ marginVertical: 4 }}>
					{description}
				</Text>
			)}
			<Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 2 }}>
				{total_photos} photos · {published_at.formatAsDate()}
			</Text>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					marginTop: 8,
					marginHorizontal: -4,
				}}
			>
				{tags.map((tag) => (
					<Chip
						key={tag.title}
						style={{ margin: 4 }}
						onPress={() =>
							navigation?.navigate(ScreenName.searchResult, {
								searchInput: { query: tag.title },
							})
						}
					>
						{tag.title}
					</Chip>
				))}
			</View>
		</Surface>
	)
}
