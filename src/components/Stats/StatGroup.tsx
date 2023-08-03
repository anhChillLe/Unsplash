import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import Stat from "./Stat"
import VerticalDivider from "../Devider/VetticalDivider"

type Props = {
	total_likes: number
	total_photos: number
	followers_count: number
	downloads: number
	containerStyle?: StyleProp<ViewStyle>
}

export default function StatGroup(props: Props) {
	const { total_likes, total_photos, followers_count, downloads, containerStyle } = props

	return (
		<View
			style={[styles.container, containerStyle]}
		>
			<Stat title="Likes" count={total_likes} />
			<VerticalDivider />
			<Stat title="Photos" count={total_photos} />
			<VerticalDivider />
			<Stat title="Followers" count={followers_count} />
			<VerticalDivider />
			<Stat title="Downloads" count={downloads} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	}
})
