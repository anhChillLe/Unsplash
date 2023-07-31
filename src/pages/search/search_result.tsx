import { Dimensions, StyleSheet, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListPhoto } from "../../components"
import { useSearch } from "../../hooks"
import { useAppNavigation, useSearchResultRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { Photo } from "../../service/unsplash/models"

export default function SearchResultScreen() {
	const route = useSearchResultRoute()
	const { width } = Dimensions.get("window")
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useAppNavigation()
	const handleItemPress = (photo: Photo, index: number) => navigation.navigate(Screens.detail, { photo })
	const { photos, total, loadMore } = useSearch(route.params.searchInput)

	return (
		<Surface mode="flat" style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />

			<ListPhoto
				width={width - 8}
				space={4}
				photos={photos}
				header={<SearchHeader query={route.params.searchInput.query} total={total} />}
				column={2}
				onEndReached={loadMore}
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
