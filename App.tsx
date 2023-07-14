import React, { ReactElement } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { darkTheme, lightTheme } from "./src/assets/themes";
import RootStack from "./src/navigations/root_stack";
import { store } from "./src/redux/store/store";

export default function App(): ReactElement {
	const colorScheme = useColorScheme();
	const isDarkMode = colorScheme === "dark";
	const theme = isDarkMode ? darkTheme : lightTheme;

	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor(theme.colors.elevation.level1);
		changeNavigationBarColor(theme.colors.elevation.level1);
	}
	StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");

	return (
		<SafeAreaProvider>
			<ReduxProvider store={store}>
				<PaperProvider theme={theme}>
					<RootStack />
				</PaperProvider>
			</ReduxProvider>
		</SafeAreaProvider>
	);
}
