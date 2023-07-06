import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-url-polyfill/auto';
import UserPage from './src/pages/user/user_page';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootsplash from 'react-native-bootsplash'

// AppRegistry.registerComponent(appName, () => TestPage);
AppRegistry.registerComponent(appName, () => App);

function TestPage(){

  RNBootsplash.hide()
  
  return (
    <SafeAreaProvider>
      <UserPage />
    </SafeAreaProvider>
  )
}