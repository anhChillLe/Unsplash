import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { useTheme, Card, Divider } from "react-native-paper"

type Props = {
	data: number[]
	width: number
	height: number
	space?: number
	padding?: number
	style?: StyleProp<ViewStyle>
}

export default function Chart({ data, width, height, padding = 4, space, style }: Props) {
	const safeWidth = width - padding * 2
	if (data.length === 0) return null

	if (!space) {
		space = ((safeWidth / data.length) * 0.1) / (data.length - 1)
	}

	const itemWidth = safeWidth / data.length - (data.length - 1) * space
	const theme = useTheme()
	const max = Math.max(...data)
	const base = max === 0 ? 0 : height / max

	const renderItem = (item: number, index: number) => {
		return (
			<View
				key={index}
				style={{
					height: base * item,
					width: itemWidth,
					borderTopLeftRadius: itemWidth / 8,
					borderTopRightRadius: itemWidth / 8,
					borderRadius: itemWidth / 8,
					backgroundColor: theme.colors.primary,
				}}
			/>
		)
	}

	return (
		<View style={[{ width: safeWidth, height, padding, justifyContent: "flex-end" }, style]}>
			<View style={styles.container}>{data.map(renderItem)}</View>
			<Divider style={{ backgroundColor: theme.colors.primary }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "flex-end",
		overflow: "hidden",
	},
})
