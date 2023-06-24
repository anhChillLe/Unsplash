import {Center, NativeBaseProvider, Text} from 'native-base';
import {store} from './src/redux/store/store';
import {Provider as ReduxProvider} from 'react-redux';

export default function App() {
  return (
    <NativeBaseProvider>
      <ReduxProvider store={store}>
        <Center flex={1}>
          <Text fontSize="xl">Hello world!</Text>
        </Center>
      </ReduxProvider>
    </NativeBaseProvider>
  );
}
