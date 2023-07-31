import { NavigationContext } from "@react-navigation/native"
import { useContext } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { LoginWidthUnsplash } from "../../actions/link_actions"
import { Images } from "../../assets/images"
import { Icons } from "../../assets/images/icons"
import { useAppNavigation } from "../../navigations/hooks"

export default function LandingPage() {
	const navigation = useAppNavigation()
	const openApp = () => {
		// navigation.navigate(ScreenName.main)
	}

	return (
		<ImageBackground source={Images.landing2} style={styles.container}>
			<View style={{ alignItems: "flex-start" }}>
				<Text variant="displayMedium" style={[styles.heading, styles.headingLarge]}>
					Chill Paper
				</Text>
				<Text variant="headlineSmall" style={[styles.heading, styles.subHeading]}>
					Wallpaper app base on Unsplash API
				</Text>
			</View>
			<View style={styles.buttonGroup}>
				<Button
					mode="contained"
					rippleColor="transparent"
					onPress={openApp}
					style={styles.button}
					labelStyle={styles.buttonLabel}
				>
					Maybe laster
				</Button>
				<Button
					mode="contained"
					onPress={LoginWidthUnsplash}
					icon={Icons.unsplash}
					rippleColor="transparent"
					style={[styles.button, styles.buttonLogin]}
					labelStyle={styles.buttonLabel}
				>
					Login with Unsplash
				</Button>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	heading: {
		color: "white",
		marginTop: 8,
		textShadowColor: "rgba(0,0,0,0.2)",
		textShadowRadius: 8,
		textShadowOffset: {
			width: 1,
			height: 1,
		},
	},
	headingLarge: {
		fontWeight: "bold",
	},
	subHeading: {
		fontWeight: "500",
		marginTop: 8,
	},
	container: {
		flex: 1,
		paddingHorizontal: 32,
		paddingVertical: 96,
		justifyContent: "space-between",
	},
	buttonGroup: {
		alignItems: "flex-end",
	},
	button: {
		paddingVertical: 8,
	},
	buttonLogin: {
		marginTop: 8,
	},
	buttonLabel: {
		fontSize: 16,
	},
})
