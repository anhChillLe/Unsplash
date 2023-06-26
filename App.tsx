import {store} from './src/redux/store/store';
import {Provider as ReduxProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './src/navigations/root_navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <Root />
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
