import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { useSelector } from "react-redux"
import { GroupHeading, HorizontalImageList } from "../../components"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { RootState } from "../../redux/store/store"
import { Photo } from "../../service/unsplash/models"

export default function PhotoGroup({ style }: { style?: StyleProp<ViewStyle> }) {
	const navigation = useAppNavigation()
	const photosState = useSelector((state: RootState) => state.photoPopular)
	const handleMorePress = () => navigation.navigate(Screens.allImage)
	const handlePhotoPress = (photo: Photo) => navigation.navigate(Screens.detail, { photo })

	return (
		<>
			<GroupHeading containerStyle={[styles.photoHeading, style]} onMorePress={handleMorePress}>
				Top of the week
			</GroupHeading>
			<HorizontalImageList
				data={photosState.photos}
				itemWidth={135}
				itemHeight={240}
				space={16}
				maxItem={6}
				isLoading={photosState.isLoading}
				containerStyle={styles.photoListContainer}
				onItemPress={handlePhotoPress}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	photoHeading: {
		marginTop: 32,
	},
	photoListContainer: {
		marginTop: 12,
		paddingHorizontal: 16
	},
})
