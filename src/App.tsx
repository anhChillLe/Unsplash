import React, { ReactElement } from "react"
import { Platform, StatusBar, useColorScheme } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { darkTheme, lightTheme } from "./assets/themes"
import RootStack from "./navigations/root_stack"
import { store } from "./redux/store/store"

export default function App(): ReactElement {
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === "dark"
	const theme = isDarkMode ? darkTheme : lightTheme

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
