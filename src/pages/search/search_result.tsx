import { NavigationContext } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto } from "../../components"
import { SearchResultRoute } from "../../navigations/param_list"
import { Screens } from "../../navigations/screen_name"
import getSearchViewModel, { SearchViewmodel } from "../../viewmodels/search_viewmodel"
import { Photo } from "../../service/unsplash/models"

export default function SearchResultContainer({ route }: SearchResultRoute) {
	const input = route.params.searchInput
	const viewModel = getSearchViewModel(input)

	return <SearchResultScreen {...viewModel} />
}

function SearchResultScreen({ isLoading, photos, query, total, getPhotos }: SearchViewmodel) {
	const { width } = Dimensions.get("window")
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useContext(NavigationContext)
	const handleItemPress = (photo: Photo, index: number) => navigation?.navigate(Screens.detail, { photo })

	useEffect(getPhotos, [])

	return (
		<Surface mode="flat" style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />

			<ListPhoto
				width={width - 8}
				space={4}
				photos={photos}
				header={<SearchHeader query={query} total={total} />}
				column={2}
				onEndReached={getPhotos}
				itemThreshold={8}
				onItemPress={handleItemPress}
				contentContainerStyle={[styles.listContainer, { paddingBottom: bottom }]}
			/>
		</Surface>
	)
}

function SearchHeader({ total, query }: { total: number; query: string }) {
	return (
		<View style={styles.headerContainer}>
			<Text variant="headlineLarge">
				Found <Text style={styles.highlightText}>{total}</Text> images for{" "}
				<Text style={styles.highlightText}>{query}</Text>
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	listContainer: {
		paddingHorizontal: 4,
	},
	headerContainer: {
		paddingStart: 8,
		paddingBottom: 8,
	},
	highlightText: {
		fontWeight: "bold",
	},
})
