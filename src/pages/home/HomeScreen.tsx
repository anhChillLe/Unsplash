import React, { useEffect } from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ViewOnlySearchBar from "../../components/Search/ViewOnlySeachBar"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { fetchCollections } from "../../redux/features/collection/collections"
import getPopularPhotos from "../../redux/features/photo/action"
import { fetchTopics } from "../../redux/features/topic/topics"
import { getCurrentUser } from "../../redux/features/user/action"
import { useAppDispatch } from "../../redux/store/store"
import CollectionGroup from "./CollectionGroup"
import PhotoGroup from "./PhotoGroup"
import TopicGroup from "./TopicGroup"
import UserGroup from "./UserGroup"

export default function HomeScreen() {
	const navigation = useAppNavigation()
	const { width } = Dimensions.get("window")
	const { top, bottom } = useSafeAreaInsets()
	const dispatch = useAppDispatch()
	const safeAreaWidth = width - 32

	useEffect(() => {
		dispatch(getPopularPhotos())
		dispatch(fetchTopics())
		dispatch(fetchCollections())
		dispatch(getCurrentUser())
	}, [])

	return (
		<Surface style={[styles.container, { paddingTop: top}]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: bottom }}>
				<View style={styles.groupContainer}>
					<UserGroup />
					<ViewOnlySearchBar
						placeHolder="Search for image"
						onPress={() => navigation.navigate(Screens.search)}
						value=""
						style={{ width: "100%" }}
					/>
				</View>

				<PhotoGroup style={styles.groupContainer} />

				<View style={styles.groupContainer}>
					<TopicGroup width={safeAreaWidth} />
					<CollectionGroup width={safeAreaWidth} />
				</View>
			</ScrollView>
		</Surface>
	)
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	groupContainer: {
		paddingHorizontal: 16,
		width: "100%",
	},
})
