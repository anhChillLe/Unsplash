import { ReactElement } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import { Text, TextProps, useTheme } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
	style?: StyleProp<ViewStyle>
	icon: string
	iconSize?: number
} & TextProps<never>
export default function TextIcon({ style, icon, iconSize = 20, ...props }: Props): ReactElement {
	const theme = useTheme()

	return (
		<Pressable style={[{ flexDirection: "row", alignItems: "center" }, style]}>
			<Icon size={iconSize} name={icon} color={theme.colors.onSurface} />
			<Text style={{ marginStart: 8 }} {...props} />
		</Pressable>
	)
}
