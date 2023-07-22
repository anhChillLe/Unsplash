import { PropsWithChildren } from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import { Text, useTheme } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type Props = PropsWithChildren<{
	style?: StyleProp<ViewStyle>
	icon: string
}>
export default function TextIcon({ style, icon, children }: Props) {
	const theme = useTheme()

	return (
		<Pressable style={[{ flexDirection: "row", alignItems: 'center' }, style]}>
			<Icon size={20} name={icon} color={theme.colors.onSurface}/>
			<Text style={{marginStart: 8}}>{children}</Text>
		</Pressable>
	)
}
