import { PropsWithChildren, ReactElement } from "react"
import { View } from "react-native"
import { Chip } from "react-native-paper"
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon"

type Props = PropsWithChildren<{
	avatar?: ReactElement
	mode?: "flat" | "outlined"
	icon?: IconSource
	onPress?: () => void
}>

export default function SingleTag({ children, mode = "outlined", icon, avatar, onPress = () => {} }: Props) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "flex-start",
				marginTop: 12,
			}}
		>
			<Chip {...{ mode, icon, onPress, avatar }}>{children}</Chip>
		</View>
	)
}
