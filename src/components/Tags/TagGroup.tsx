import { View } from "react-native"
import { Chip } from "react-native-paper"
import { Tag } from "../../unsplash/models/base"

export default function TagGroup({ tags, onItemPress = () => {} }: { tags: Tag[]; onItemPress?: (tag: Tag) => void }) {
	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				marginHorizontal: -4,
				marginTop: 4,
			}}
		>
			{tags.map((tag: Tag, index: number) => (
				<Chip key={tag.title} style={{ margin: 4 }} onPress={() => onItemPress(tag)}>
					{tag.title}
				</Chip>
			))}
		</View>
	)
}
