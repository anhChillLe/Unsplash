import {store} from './src/redux/store/store';
import {Provider as ReduxProvider} from 'react-redux';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './src/navigations/root_navigation';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const backgroundColor = theme.colors.elevation.level1;

  // if (Platform.OS === 'android') {
  //   StatusBar.setBackgroundColor(backgroundColor);
  //   changeNavigationBarColor('transparent', !isDarkMode)
  // }

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <Root />
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
