import { NavigationContext } from "@react-navigation/native"
import { useContext } from "react"
import { Dimensions } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { BackAppBar, ListAlbums } from "../../components"
import { ScreenName } from "../../navigations/screen_name"
import { RootState } from "../../redux/store/store"

export default function TopicScreen() {
	const state = useSelector((state: RootState) => state.topic)
	const { top, bottom } = useSafeAreaInsets()
	const width = Dimensions.get("window").width
	const safeAreaWidth = width - 32
	const navigation = useContext(NavigationContext)

	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
				paddingTop: top,
			}}
		>
			<BackAppBar />
			<ListAlbums
				data={state.topics}
				column={1}
				space={8}
				mode="list"
				itemMode="group"
				header={<Header />}
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingBottom: bottom + 16, paddingHorizontal: 16 }}
				isLoading={state.isLoading}
				width={safeAreaWidth}
				onItemPress={(topic) => {
					console.log(topic.id)
					navigation?.navigate(ScreenName.topicPhotos, { id_or_slug: topic.id })
				}}
			/>
		</Surface>
	)
}

function Header() {
	return (
		<Text variant="displayLarge" style={{ fontWeight: "500", marginVertical: 16 }}>
			Topics
		</Text>
	)
}
