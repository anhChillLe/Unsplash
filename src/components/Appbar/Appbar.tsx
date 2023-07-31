import { NavigationContext } from "@react-navigation/native"
import { ReactElement, useContext } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { useAppNavigation } from "../../navigations/hooks"

type Props = {
	onMore?: () => void
	title?: string
	style?: StyleProp<ViewStyle>
	color?: string
}

export default function MyAppBar(props: Props): ReactElement {
	const { title, onMore, style, color } = props
	const navigation = useAppNavigation()

	return (
		<View style={[styles.container, style]}>
			<IconButton mode="contained" icon="arrow-left" onPress={navigation.goBack} />
			{title && <Text variant="titleLarge" style={styles.title}>
				{title}
			</Text>}
			<View style={{ flex: 1 }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 4,
	},
	title: {
		marginStart: 8
	}
})
