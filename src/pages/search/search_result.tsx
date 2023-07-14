import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { BackAppBar, ListImageLite } from "../../components";
import { SearchResultRoute } from "../../navigations/param_list";
import { ScreenName } from "../../navigations/screen_name";
import { loadMoreSearchResult, searchImage } from "../../redux/features/search/actions";
import { SearchState } from "../../redux/features/search/search";
import { AppDispatch, RootState } from "../../redux/store/store";

export default function SearchResultScreen({ route }: SearchResultRoute) {
	const { width } = Dimensions.get("window");
	const { top, bottom } = useSafeAreaInsets();
	const input = route.params;
	const state = useSelector((state: RootState) => state.search);
	const navigation = useContext(NavigationContext);

	const dispatch = useDispatch<AppDispatch>();

	const loadMore = () => {
		dispatch(loadMoreSearchResult(input.searchInput));
	};

	useEffect(() => {
		dispatch(searchImage(input.searchInput));
	}, []);

	return (
		<Surface
			mode="flat"
			style={{
				flex: 1,
				height: "100%",
				paddingTop: top,
				paddingBottom: bottom,
			}}
		>
			<BackAppBar />

			<ListImageLite
				width={width - 8}
				space={4}
				photos={state.photos}
				header={<SearchHeader state={state} />}
				column={2}
				onEndReached={loadMore}
				itemThreshold={6}
				onItemPress={(photo, index) =>
					navigation?.navigate(ScreenName.detailPager, { position: index, type: "search" })
				}
				contentContainerStyle={{ paddingHorizontal: 4 }}
			/>
		</Surface>
	);
}

function SearchHeader({ state }: { state: SearchState }) {
	return (
		<View style={{ paddingStart: 8, paddingBottom: 8 }}>
			<Text variant="headlineLarge">
				Found <Text style={{ fontWeight: "bold" }}>{state.total}</Text> images for{" "}
				<Text style={{ fontWeight: "bold" }}>{state.histories[state.histories.length - 1]}</Text>
			</Text>
		</View>
	);
}
