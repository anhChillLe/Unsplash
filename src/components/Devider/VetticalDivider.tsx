import { StyleProp, ViewStyle } from "react-native"
import { Divider } from "react-native-paper"

export default function VerticalDivider({ style }: { style?: StyleProp<ViewStyle> }) {
	return <Divider style={[{ width: 0.5, height: "100%" }, style]} />
}
