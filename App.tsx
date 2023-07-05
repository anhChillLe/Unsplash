import {store} from './src/redux/store/store';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/assets/themes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
import RootStack from './src/navigations/root_stack';

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

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
