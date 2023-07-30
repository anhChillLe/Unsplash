import { NavigationContext } from "@react-navigation/native"
import { useContext } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListAlbums, LoadingScreen, UserElement } from "../../components"
import { useUserCollections } from "../../hooks/user_collections"
import { Screens } from "../../navigations/screen_name"
import { useUserState } from "../../redux/store/store"
import { BaseGroup } from "../../service/unsplash/models"

export default function UserCollection() {
	const navigation = useContext(NavigationContext)
	const width = Dimensions.get("window").width
	const { top, bottom } = useSafeAreaInsets()
	const safeAreaWidth = width - 32
	const { profile } = useUserState()
	if (!profile) return <LoadingScreen />
	const { isLoading, collections, loadMore } = useUserCollections(profile.username)
	const handleItemPress = (collection: BaseGroup) => navigation?.navigate(Screens.collectionPhotos, { collection })

	return (
		<Surface style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListAlbums
				data={collections}
				column={1}
				space={16}
				mode="list"
				itemMode="group"
				style={{ flex: 1 }}
				header={<UserElement {...profile} style={styles.header} />}
				onEndReached={loadMore}
				onItemPress={handleItemPress}
				contentContainerStyle={{
					paddingBottom: bottom,
					paddingHorizontal: 16,
				}}
				isLoading={isLoading}
				width={safeAreaWidth}
				showLoadingFooter={true}
			/>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	header: {
		marginBottom: 16,
	},
})
