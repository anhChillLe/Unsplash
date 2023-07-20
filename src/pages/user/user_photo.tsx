import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar, ListPhoto, UserElement } from "../../components";
import { UserPhotosRoute } from "../../navigations/param_list";
import { ScreenName } from "../../navigations/screen_name";
import getUserPhotosViewModel, { UserPhotosViewModel } from "../../viewmodels/user_photos_viewmode";

export default function UserPhotoPage({ route }: UserPhotosRoute) {
	const user = route.params.user;
	const viewModel = getUserPhotosViewModel(user);

	return <UserPhotos {...viewModel} />;
}

function UserPhotos({ isLoading, user, photos, getPhotos, loadMore }: UserPhotosViewModel) {
	const inset = useSafeAreaInsets();
	const { width } = Dimensions.get("window");
	const navigation = useContext(NavigationContext);
	const contentWidth = width - 16;

	const { profile_image, name, username } = user;

	useEffect(() => {
		getPhotos();
	}, []);

	function Header() {
		return (
			<View style={{ paddingBottom: 5 }}>
				<UserElement size="large" {...{ profile_image, name, username }} style={{ paddingBottom: 4 }} />
				<Text variant="headlineSmall">All photos of {name}</Text>
			</View>
		);
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
				width={contentWidth}
				space={4}
				header={<Header />}
				photos={photos}
				column={3}
				onEndReached={loadMore}
				onItemPress={(photo) => navigation?.navigate(ScreenName.detail, { photo })}
				contentContainerStyle={{
					paddingHorizontal: 8,
				}}
			/>
		</Surface>
	);
}
