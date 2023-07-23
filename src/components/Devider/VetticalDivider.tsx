import { ReactElement } from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { Divider } from "react-native-paper"

export default function VerticalDivider({ style }: { style?: StyleProp<ViewStyle> }): ReactElement {
	return <Divider style={[styles.divider, style]} />
}

const styles = StyleSheet.create({
	divider: {
		width: 0.5,
		height: "100%",
	},
})
