import { Dimensions, StyleSheet } from "react-native"
import { Surface } from "react-native-paper"
import { ListPhoto } from "../../components"
import { useListPhoto } from "../../hooks"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { OrderBy } from "../../service/unsplash/constants/OrderBy"
import { Photo } from "../../service/unsplash/models"

export default function ListImage({ order }: { order: OrderBy }) {
	const navigation = useAppNavigation()
	const width = Dimensions.get("window").width
	const { loadMore, photos, isLoading } = useListPhoto(order)
	const handleItemPress = (photo: Photo, index: number) =>
		navigation.navigate({
			key: photo.id,
			name: Screens.detail,
			params: { photo },
			merge: false,
		})

	return (
		<Surface style={styles.container}>
			<ListPhoto
				width={width - 8}
				space={4}
				photos={photos}
				column={3}
				style={styles.list}
				itemThreshold={9}
				onEndReached={loadMore}
				onItemPress={handleItemPress}
			/>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		paddingHorizontal: 4,
	},
	list: {
		flex: 1,
	},
})
