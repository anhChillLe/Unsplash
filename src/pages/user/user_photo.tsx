import { Dimensions, StyleSheet, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto, UserElement } from "../../components"
import { useUserPhotos } from "../../hooks"
import { useAppNavigation, useUserPhotosRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { Photo } from "../../service/unsplash/models"

export default function UserPhotos() {
	const { width } = Dimensions.get("window")
	const route = useUserPhotosRoute()
	const inset = useSafeAreaInsets()
	const navigation = useAppNavigation()
	const { profile_image, name, username } = route.params.user
	const { loadMore, photos } = useUserPhotos(username)

	function Header() {
		return (
			<View style={{ paddingBottom: 5 }}>
				<UserElement size="large" {...{ profile_image, name, username }} style={{ paddingBottom: 4 }} />
				<Text variant="headlineSmall">All photos of {name}</Text>
			</View>
		)
	}

	const handleItemPress = (photo: Photo) =>
		navigation.navigate({
			key: photo.id,
			name: Screens.detail,
			params: { photo },
			merge: false,
		})

	return (
		<Surface style={[styles.container, { paddingTop: inset.top }]}>
			<BackAppBar />
			<ListPhoto
				width={width - 16}
				space={4}
				header={<Header />}
				photos={photos}
				column={3}
				onEndReached={loadMore}
				onItemPress={handleItemPress}
				contentContainerStyle={{
					paddingHorizontal: 8,
					paddingBottom: inset.bottom,
				}}
			/>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
})
