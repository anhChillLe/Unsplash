import { useSelector } from "react-redux"
import { RootState } from "../../redux/store/store"
import { useContext } from "react"
import { NavigationContext } from "@react-navigation/native"
import { GroupHeading, ListAlbums } from "../../components"
import { Screens } from "../../navigations/screen_name"
import { StyleSheet } from "react-native"
import { BaseGroup } from "../../service/unsplash/models"
import { useAppNavigation } from "../../navigations/hooks"

export default function CollectionGroup({ width }: { width: number }) {
	const collectionsState = useSelector((state: RootState) => state.collection)
	const navigation = useAppNavigation()
	const handleItemPress = (collection: BaseGroup) => navigation.navigate(Screens.collectionPhotos, { collection })
	const handleMorePress = () => navigation.navigate(Screens.collections)

	return (
		<>
			<GroupHeading containerStyle={styles.collectionHeading} onMorePress={handleMorePress}>
				Hot collections
			</GroupHeading>
			<ListAlbums
				data={collectionsState.collections}
				column={2}
				space={8}
				maxItems={4}
				itemRatio={2}
				isLoading={collectionsState.isLoading}
				mode="compact"
				width={width}
				onItemPress={handleItemPress}
				style={styles.listAlbum}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	collectionHeading: {
		marginTop: 32,
	},
	listAlbum: {
		marginTop: 12,
	},
})
