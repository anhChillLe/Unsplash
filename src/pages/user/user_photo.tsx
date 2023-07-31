import { Dimensions, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto, UserElement } from "../../components"
import { useUserPhotos } from "../../hooks"
import { useAppNavigation, useUserPhotosRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"

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

	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
				paddingBottom: inset.bottom,
				paddingTop: inset.top,
			}}
		>
			<BackAppBar />
			<ListPhoto
				width={width - 16}
				space={4}
				header={<Header />}
				photos={photos}
				column={3}
				onEndReached={loadMore}
				onItemPress={photo => navigation.navigate(Screens.detail, { photo })}
				contentContainerStyle={{
					paddingHorizontal: 8,
				}}
			/>
		</Surface>
	)
}
