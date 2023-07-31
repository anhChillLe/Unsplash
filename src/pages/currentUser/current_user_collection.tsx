import { NavigationContext } from "@react-navigation/native"
import { useContext } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { AnimatedFAB, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ListAlbums, LoadingScreen, UserElement } from "../../components"
import { Screens } from "../../navigations/screen_name"
import { useUserState } from "../../redux/store/store"
import { BaseGroup } from "../../service/unsplash/models"
import { useUserCollections } from "../../hooks"
import { useAppNavigation } from "../../navigations/hooks"

export default function CurentUserCollection() {
	const { width } = Dimensions.get("window")

	const navigation = useAppNavigation()
	const { top, bottom } = useSafeAreaInsets()
	const { profile } = useUserState()
	if (!profile) return <LoadingScreen />
	const { isLoading, collections, loadMore } = useUserCollections(profile.username)
	const handleItemPress = () => navigation.navigate(Screens.curentUserCollection)

	return (
		<Surface style={[styles.container, { paddingTop: top }]}>
			<BackAppBar />
			<ListAlbums
				data={collections}
				column={1}
				space={16}
				mode="list"
				itemMode="group"
				style={{ flex: 1 }}
				header={<UserElement {...profile} style={styles.header} />}
				onEndReached={loadMore}
				onItemPress={handleItemPress}
				contentContainerStyle={{
					paddingBottom: bottom,
					paddingHorizontal: 16,
				}}
				isLoading={isLoading}
				width={width - 32}
				showLoadingFooter={profile.total_collections > collections.length}
			/>
			<AnimatedFAB
				icon="add"
				label="Create new collection"
				extended={false}
				animateFrom="right"
				iconMode="static"
			/>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	header: {
		marginBottom: 16,
	},
})
