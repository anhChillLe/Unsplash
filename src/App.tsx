import React, { ReactElement } from "react"
import { Image, Platform, StatusBar, useColorScheme } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { darkTheme, lightTheme } from "./assets/themes"
import RootStack from "./navigations/root_stack"
import { store } from "./redux/store/store"
import { Images } from "./assets/images"
import FastImage from "react-native-fast-image"

export default function App(): ReactElement {
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === "dark"
	const theme = isDarkMode ? darkTheme : lightTheme

	preloadImages()
	Platform.OS === "android" && StatusBar.setBackgroundColor(theme.colors.elevation.level1)
	StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content")

	return (
		<SafeAreaProvider>
			<ReduxProvider store={store}>
				<PaperProvider theme={theme}>
					<RootStack />
				</PaperProvider>
			</ReduxProvider>
		</SafeAreaProvider>
	)
}


function preloadImages() {
	const images = [Images.landing, Images.landing2]
	const uris = images.map(image => ({
		uri: Image.resolveAssetSource(image).uri,
	}))
	FastImage.preload(uris)
}
