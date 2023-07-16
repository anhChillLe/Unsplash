import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { IconButton, Text } from "react-native-paper";

type Props = {
	onMore?: () => void;
	title?: string;
	style?: StyleProp<ViewStyle>;
	color?: string;
};

export default function MyAppBar(props: Props) {
	const { title, onMore, style, color } = props;
	const navigation = useContext(NavigationContext);

	return (
		<View
			style={[
				{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 4,
				},
				style,
			]}
		>
			<IconButton mode="contained" icon="arrow-left" onPress={navigation?.goBack} />
			<Text variant="titleLarge" style={{ marginStart: 8 }}>
				{title}
			</Text>
			<View style={{ flex: 1 }} />
		</View>
	);
}
