import PagerView from "react-native-pager-view";
import { Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { BackAppBar } from "../../components";
import { DetailPagerRoute } from "../../navigations/param_list";
import { getCollectionPhotos } from "../../redux/features/collection/photos";
import { getPhotosLatest, getPhotosOldest, getPhotosPopular } from "../../redux/features/photo/action";
import { getTopicPhotos } from "../../redux/features/topic/detail";
import { AppDispatch, RootState } from "../../redux/store/store";
import { Photo } from "../../services/api/type";
import PageContainer from "./image_page";

export default function DetailViewPager({ route }: DetailPagerRoute) {
	const { top, bottom } = useSafeAreaInsets();
	const dispatch = useDispatch<AppDispatch>();
	const initalPage = route.params.position;
	const state = useSelector((state: RootState) => {
		switch (route.params.type) {
			case "latest":
				return state.photoLatest;
			case "oldest":
				return state.photoOldest;
			case "popular":
				return state.photoPopular;
			case "topic":
				return state.topicPhotos;
			case "collection":
				return state.collectionPhotos;
			case "search":
				return state.search;
		}
	});

	const loadMore = () => {
		switch (route.params.type) {
			case "latest":
				dispatch(getPhotosLatest());
				break;
			case "oldest":
				dispatch(getPhotosOldest());
				break;
			case "popular":
				dispatch(getPhotosPopular());
				break;
			case "topic":
				dispatch(getTopicPhotos("nextPage"));
				break;
			case "collection":
				dispatch(getCollectionPhotos("nextPage"));
				break;
		}
	};

	const onPageChange = (index: number) => {
		if (index > state.photos.length - 4) {
			loadMore();
		}
	};

	return (
		<Surface mode="flat" style={{ flex: 1, height: "100%", paddingTop: top, paddingBottom: bottom }}>
			<BackAppBar />
			<PagerView
				style={{ flex: 1 }}
				offscreenPageLimit={1}
				initialPage={initalPage}
				pageMargin={8}
				overdrag={false}
				onPageSelected={(position) => {
					onPageChange(position.nativeEvent.position);
				}}
			>
				{state.photos.map((photo: Photo) => (
					<PageContainer key={photo.id} photo={photo} />
				))}
			</PagerView>
		</Surface>
	);
}
