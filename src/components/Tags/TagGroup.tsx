import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Chip } from "react-native-paper"
import { Tag } from "../../service/unsplash/models"

type Props = {
	tags: Tag[]
	onItemPress?: (tag: Tag) => void
	containerStyle?: StyleProp<ViewStyle>
}
export default function TagGroup({ tags, onItemPress = () => {}, containerStyle }: Props) {
	return (
		<View style={containerStyle}>
			<View style={styles.container}>
				{tags.map((tag: Tag, index: number) => (
					<Chip key={tag.title} style={styles.tag} onPress={() => onItemPress(tag)}>
						{tag.title}
					</Chip>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		margin: -4,
	},
	tag: {
		margin: 4,
	},
})
