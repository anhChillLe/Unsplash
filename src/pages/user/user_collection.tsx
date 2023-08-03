import { Dimensions } from "react-native"
import { Surface } from "react-native-paper"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListAlbums, UserElement } from "../../components"
import { useUserCollections } from "../../hooks"
import { useAppNavigation, useUserCollectionsRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { BaseGroup } from "../../service/unsplash/models"

export default function UserCollection() {
	const route = useUserCollectionsRoute()
	const user = route.params.user
	const { width } = Dimensions.get("window")
	const navigation = useAppNavigation()
	const { top, bottom } = useSafeAreaInsets()
	const { isLoading, collections, loadMore } = useUserCollections(user.username)

	const handleItemPress = (collection: BaseGroup) =>
		navigation.navigate({
			key: collection.id,
			name: Screens.collectionPhotos,
			params: { collection },
			merge: false,
		})

	return (
		<SafeAreaView style={{ flex: 1 }} edges={[]}>
			<Surface
				style={{
					flex: 1,
					height: "100%",
					paddingTop: top,
				}}
			>
				<BackAppBar />
				<ListAlbums
					data={collections}
					column={1}
					space={16}
					mode="list"
					itemMode="group"
					style={{ flex: 1 }}
					header={<UserElement {...user} style={{ marginBottom: 16 }} />}
					onEndReached={loadMore}
					onItemPress={handleItemPress}
					contentContainerStyle={{
						paddingBottom: bottom + 16,
						paddingHorizontal: 16,
					}}
					isLoading={isLoading}
					width={width - 32}
					showLoadingFooter={collections.length < user.total_collections}
				/>
			</Surface>
		</SafeAreaView>
	)
}
