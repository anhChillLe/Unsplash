import { StyleSheet } from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";

export default function LoadingScreen() {
	return (
		<Surface
			style={styles.container}
		>
			<ActivityIndicator size="large" />
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		alignItems: 'center',
		justifyContent: 'center',
	}
})