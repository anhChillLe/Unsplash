import { MD3LightTheme, MD3Theme } from "react-native-paper"
import { baseTheme } from "./base"

export const lightTheme: MD3Theme = {
	...MD3LightTheme,
	...baseTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: "#00677d",
		onPrimary: "#ffffff",
		primaryContainer: "#b2ebff",
		onPrimaryContainer: "#001f27",
		secondary: "#4b626a",
		onSecondary: "#ffffff",
		secondaryContainer: "#cee7f0",
		onSecondaryContainer: "#061e25",
		tertiary: "#585c7e",
		onTertiary: "#ffffff",
		tertiaryContainer: "#dfe0ff",
		onTertiaryContainer: "#151937",
		error: "#ba1a1a",
		errorContainer: "#ffdad6",
		onError: "#ffffff",
		onErrorContainer: "#410002",
		background: "#fbfcfe",
		onBackground: "#191c1d",
		outline: "#D0D0D0", //Boder color
		inverseOnSurface: "#eff1f2",
		inverseSurface: "#2e3132",
		inversePrimary: "#59d5f8",
		shadow: "#000000",
		outlineVariant: "#bfc8cc",
		scrim: "#000000",
		surface: "transparent", // Chip outline background
		onSurface: "#444444",
		surfaceVariant: "#dbe4e8",
		onSurfaceVariant: "#a0a0a0", // Text field placeholder color
		elevation: {
			level0: "transparent",
			level1: "#ffffff",
			level2: "#ffffff", // Menu background
			level3: "#f0f0f0", // Search bar background
			level4: "#ffffff",
			level5: "#ffffff",
		},
	},
	fonts: {
		...MD3LightTheme.fonts,
		default: {
			...MD3LightTheme.fonts.default,
			fontWeight: "600",
		},
	},
}
