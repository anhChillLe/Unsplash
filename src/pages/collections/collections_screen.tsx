import { Surface, Text } from "react-native-paper"
import { BackAppBar, ListAlbums } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import { Dimensions, StyleSheet } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { fetchCollections } from "../../redux/features/collection/collections"
import { useContext } from "react"
import { NavigationContext } from "@react-navigation/native"
import { Screens } from "../../navigations/screen_name"
import { useAppNavigation } from "../../navigations/hooks"
import { BaseGroup } from "../../service/unsplash/models"

export default function CollectionScreen() {
	const state = useSelector((state: RootState) => state.collection)
	const navigation = useAppNavigation()
	const width = Dimensions.get("window").width
	const { top, bottom } = useSafeAreaInsets()
	const safeAreaWidth = width - 32

	const dispatch = useDispatch<AppDispatch>()
	const loadMore = () => {
		dispatch(fetchCollections())
	}

	const handleItemPress = (collection: BaseGroup) =>
	navigation.navigate({
		key: collection.id,
		name: Screens.collectionPhotos,
		params: { collection },
		merge: false,
	})

	return (
		<Surface style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListAlbums
				data={state.collections}
				column={1}
				space={8}
				mode="list"
				itemMode="group"
				style={styles.list}
				header={<Header />}
				onEndReached={loadMore}
				onItemPress={handleItemPress}
				contentContainerStyle={[styles.listContainer, { paddingBottom: bottom + 16 }]}
				isLoading={state.isLoading}
				width={safeAreaWidth}
				showLoadingFooter={true}
			/>
		</Surface>
	)
}

const Header = () => (
	<Text variant="displayMedium" style={styles.header}>
		Collections
	</Text>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	list: {
		flex: 1,
	},
	listContainer: {
		paddingHorizontal: 16,
	},
	header: {
		fontWeight: "bold",
		marginVertical: 16,
	},
})
