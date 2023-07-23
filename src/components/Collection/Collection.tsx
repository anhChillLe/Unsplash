import { ReactElement } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "react-native-paper"
import { BaseGroup } from "../../service/unsplash/models/base"
import ImageGrid from "../List/ImageGrid"

type Props = {
	collection: BaseGroup
	containerStyle?: StyleProp<ViewStyle>
	imageStyle?: StyleProp<ViewStyle>
	space?: number
	onPress?: () => void
}

export default function CollectionCard({
	collection,
	containerStyle,
	imageStyle,
	space = 2,
	onPress,
}: Props): ReactElement {
	const photos = collection.preview_photos ?? []

	return (
		<View style={containerStyle}>
			<ImageGrid photos={photos} containerStyle={imageStyle} space={space} onPress={onPress} />
			<Text variant="titleMedium" numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
				{collection.title}
			</Text>
			<Text variant="bodySmall" style={styles.sub}>
				{collection.total_photos} wallpapers
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		marginTop: 4,
	},
	sub: {
		fontWeight: "500",
	},
})
