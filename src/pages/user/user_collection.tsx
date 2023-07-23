import { NavigationContext, RouteProp } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar, ListAlbums, UserElement } from "../../components";
import { AppParamList, UserCollectionsRoute } from "../../navigations/param_list";
import { Screens } from "../../navigations/screen_name";
import { UserCollectionViewModel, getUserCollectionViewmodel } from "../../viewmodels/user_collection_viewmodel";

export default function UserCollectionPage({ route }: UserCollectionsRoute) {
	const user = route.params.user;
	const viewModel = getUserCollectionViewmodel(user);
	return <UserCollection {...viewModel} />;
}

function UserCollection({ isLoading, user, collections, listCollection, loadMore }: UserCollectionViewModel) {
	const navigation = useContext(NavigationContext);
	const width = Dimensions.get("window").width;
	const { top, bottom } = useSafeAreaInsets();
	const safeAreaWidth = width - 32;

	useEffect(() => {
		listCollection();
	}, []);

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
					onItemPress={(collection) => navigation?.navigate(Screens.collectionPhotos, { collection })}
					contentContainerStyle={{
						paddingBottom: bottom + 16,
						paddingHorizontal: 16,
					}}
					isLoading={isLoading}
					width={safeAreaWidth}
					showLoadingFooter={true}
				/>
			</Surface>
		</SafeAreaView>
	);
}
