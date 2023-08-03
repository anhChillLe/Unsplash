import { PropsWithChildren, ReactElement } from "react"
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { Button, MD3TypescaleKey, Text } from "react-native-paper"

type VariantType = keyof typeof MD3TypescaleKey
type Props = PropsWithChildren<{
	variant?: VariantType
	onMorePress?: () => void
	containerStyle?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
}>

export default function GroupHeading({
	children,
	onMorePress,
	containerStyle,
	textStyle,
	variant = "headlineSmall",
}: Props): ReactElement {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text variant={variant} style={[styles.heading, textStyle]}>
				{children}
			</Text>
			{onMorePress && (
				<Button compact mode="text" onPress={onMorePress}>
					See more
				</Button>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: '100%',
	},
	heading: {
		fontWeight: "bold",
	},
})
