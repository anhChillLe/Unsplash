import { NavigationContext } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { Dimensions, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto } from "../../components"
import { SearchResultRoute } from "../../navigations/param_list"
import { ScreenName } from "../../navigations/screen_name"
import getSearchViewModel, { SearchViewmodel } from "../../viewmodels/search_viewmodel"

export default function SearchResultContainer({ route }: SearchResultRoute) {
	const input = route.params.searchInput
	const viewModel = getSearchViewModel(input)

	return <SearchResultScreen {...viewModel} />
}

function SearchResultScreen({ isLoading, photos, query, total, getPhotos }: SearchViewmodel) {
	const { width } = Dimensions.get("window")
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useContext(NavigationContext)

	useEffect(getPhotos, [])

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

			<ListPhoto
				width={width - 8}
				space={4}
				photos={photos}
				header={<SearchHeader query={query} total={total} />}
				column={2}
				onEndReached={getPhotos}
				itemThreshold={8}
				onItemPress={(photo, index) => navigation?.navigate(ScreenName.detail, { photo })}
				contentContainerStyle={{ paddingHorizontal: 4 }}
			/>
		</Surface>
	)
}

function SearchHeader({ total, query }: { total: number; query: string }) {
	return (
		<View style={{ paddingStart: 8, paddingBottom: 8 }}>
			<Text variant="headlineLarge">
				Found <Text style={{ fontWeight: "bold" }}>{total}</Text> images for{" "}
				<Text style={{ fontWeight: "bold" }}>{query}</Text>
			</Text>
		</View>
	)
}
