import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { AuthParamList } from './param_list';
import { ScreenName } from './screen_name';
import RequestToken from '../pages/landing/login_success';
import LandingPage from '../pages/landing/landing_page';

const Stack = createStackNavigator<AuthParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenName.loginResult} component={RequestToken} />
      <Stack.Screen name={ScreenName.login} component={LandingPage} />
    </Stack.Navigator>
  );
}
