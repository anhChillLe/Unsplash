import { NavigationContext } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { Surface } from "react-native-paper"
import { ListPhoto, LoadingScreen } from "../../components"
import { Screens } from "../../navigations/screen_name"
import getListPhotoViewmodel, { ListPhotoViewMmodel } from "../../viewmodels/list_photo_viewmodel"
import { OrderBy } from "../../service/unsplash/constants/OrderBy"
import { Photo } from "../../service/unsplash/models"

export default function ImageListContainer({ order }: { order: OrderBy }) {
	const viewmodel = getListPhotoViewmodel(order)
	return <ListImage {...viewmodel} />
}

function ListImage({ photos, getPhotos }: ListPhotoViewMmodel) {
	const navigation = useContext(NavigationContext)
	const width = Dimensions.get("window").width
	const handleItemPress = (photo: Photo, index: number) => navigation?.navigate(Screens.detail, { photo })

	useEffect(getPhotos, [])

	if (photos.length === 0) return <LoadingScreen />
	return (
		<Surface style={styles.container}>
			<ListPhoto
				width={width - 8}
				space={4}
				photos={photos}
				column={3}
				style={styles.list}
				itemThreshold={9}
				onEndReached={getPhotos}
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
