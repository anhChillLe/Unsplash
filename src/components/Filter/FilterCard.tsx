import { useState } from "react"
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Chip, Text } from "react-native-paper"

type Item = {
	value: string
	label: string
}
type Props = {
	data: Item[]
	title: string
	onSelected?: (value?: string) => void
	style?: StyleProp<ViewStyle>
}
export default function FilterCard({ data, title, onSelected, style }: Props) {
	const [currentItem, setItem] = useState<Item | undefined>()

	const onValueChange = (newItem: Item) => {
		const nextItem = newItem.value === currentItem?.value ? undefined : { ...newItem }
		setItem(nextItem)
		onSelected && onSelected(nextItem?.value)
	}

	return (
		<View style={style}>
			<Text variant="bodyLarge" style={styles.title}>
				{title}
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listItemContainer}
			>
				{data.map((item) => (
					<Chip
						key={item.value + (item.value === currentItem?.value)}
						onPress={() => onValueChange(item)}
						selected={item.value === currentItem?.value}
						style={styles.item}
					>
						{item.value}
					</Chip>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
	},
	listItemContainer: {
		marginHorizontal: -4,
	},
	item: {
		margin: 4,
	},
})
