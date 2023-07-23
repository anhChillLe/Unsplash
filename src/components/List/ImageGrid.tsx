import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { Text, useTheme } from "react-native-paper"
import { VeryBasic } from "unsplash-js/dist/methods/photos/types"
import { Photo } from "../../service/unsplash/models"
import { ReactElement } from "react"

type Props = {
	photos: Photo[]
	containerStyle?: StyleProp<ViewStyle>
	space?: number
	maxItem?: number
	onPress?: () => void
	mainAxis?: "row" | "column"
}
type RenderProps = {
	photos: Photo[]
	space: number
	onPress?: () => void
	mainAxis?: "row" | "column"
	containerStyle?: StyleProp<ViewStyle>
}

export default function ImageGrid({
	photos,
	containerStyle,
	space = 0,
	maxItem = 3,
	mainAxis = "row",
	onPress,
}: Props) {
	if (photos.length > maxItem) photos = photos.slice(0, maxItem)
	return (
		<Pressable style={[containerStyle]}>
			<RenderGrid {...{ photos, space, onPress, mainAxis }} containerStyle={{ margin: -space }} />
		</Pressable>
	)
}

function RenderGrid({ photos, space, onPress, mainAxis, containerStyle }: RenderProps): ReactElement {
	if (photos.length === 0) return <View />
	const [photo, ...data] = photos

	if (data.length === 0) {
		return (
			<Pressable style={{ flex: 1, margin: space }}>
				<FastImage source={{ uri: photo.urls.regular }} style={[styles.item]} />
				{onPress && <AllPhoto />}
			</Pressable>
		)
	}

	const isMainAxis = photos.length % 2 !== 0
	const isRow = mainAxis === "row"
	const axis = isMainAxis ? (isRow ? "row" : "column") : isRow ? "column" : "row"

	return (
		<View style={[containerStyle, { flexDirection: axis, flex: 1 }]}>
			<FastImage source={{ uri: photo.urls.regular }} style={[styles.item, { margin: space }]} />
			<RenderGrid {...{ photos: data, space, onPress, mainAxis }} />
		</View>
	)
}

function AllPhoto() {
	const colors = useTheme().colors
	return (
		<View style={[styles.itemOverlay, { backgroundColor: colors.secondary }]}>
			<Text variant="headlineSmall" style={{ fontWeight: "bold", color: colors.onSecondary }}>
				All photos
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		flex: 1,
		borderRadius: 4,
		backgroundColor: "gray",
	},
	itemOverlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		alignItems: "center",
		justifyContent: "center",
		opacity: 0.6,
		borderRadius: 4,
	},
})
