import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { Surface } from "react-native-paper";
import { ListImageLite, LoadingScreen } from "../../components";
import { ScreenName } from "../../navigations/screen_name";
import getListPhotoViewmodel, { ListPhotoViewMmodel } from "../../viewmodels/list_photo_viewmodel";
import { OrderBy } from "../../unsplash/constants/OrderBy";

export default function ImageListContainer({ order }: { order: OrderBy }) {
	const viewmodel = getListPhotoViewmodel(order);
	return <ListImage {...viewmodel} />;
}

function ListImage({ photos, getPhotos }: ListPhotoViewMmodel) {
	const navigation = useContext(NavigationContext);
	const width = Dimensions.get("window").width;

	useEffect(() => {
		getPhotos();
	}, []);

	if (photos.length === 0) return <LoadingScreen />;
	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
				paddingHorizontal: 4,
			}}
		>
			<ListImageLite
				width={width - 8}
				space={4}
				photos={photos}
				column={3}
				style={{ flex: 1 }}
				onEndReached={getPhotos}
				onItemPress={(photo, index) => navigation?.navigate(ScreenName.detail, { photo })}
			/>
		</Surface>
	);
}
