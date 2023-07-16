import { Dimensions, ScrollView } from "react-native"
import { Surface } from "react-native-paper"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store"
import React, { useContext, useEffect } from "react"
import { NavigationContext } from "@react-navigation/native"
import { ScreenName } from "../../navigations/screen_name"
import { fetchTopics } from "../../redux/features/topic/topics"
import { fetchCollections } from "../../redux/features/collection/collections"
import { getCurrentUser } from "../../redux/features/user/action"
import { container } from "../../assets/style"
import PhotoGroup from "./PhotoGroup"
import UserGroup from "./UserGroup"
import TopicGroup from "./TopicGroup"
import CollectionGroup from "./CollectionGroup"
import ViewOnlySearchBar from "../../components/Search/ViewOnlySeachBar"
import { getAppPadding } from "../../assets/style/padding_ulti"
import getPopularPhotos from "../../redux/features/photo/action"

export default function HomeScreen() {
	const navigation = useContext(NavigationContext)
	const { width } = Dimensions.get("window")
	const dispatch = useDispatch<AppDispatch>()

	const appPadding = getAppPadding()
	const safeAreaWidth = width - appPadding.paddingLeft - appPadding.paddingRight

	useEffect(() => {
		dispatch(getPopularPhotos())
		dispatch(fetchTopics())
		dispatch(fetchCollections())
		dispatch(getCurrentUser())
	}, [])

	return (
		<Surface style={[container.page]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ ...appPadding }}>
				<UserGroup />
				<ViewOnlySearchBar
					placeHolder="Search for image"
					onPress={() => navigation?.navigate(ScreenName.search)}
				/>
				<PhotoGroup />
				<TopicGroup width={safeAreaWidth} />
				<CollectionGroup width={safeAreaWidth} />
			</ScrollView>
		</Surface>
	)
}
