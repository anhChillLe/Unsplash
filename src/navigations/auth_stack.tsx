import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AuthParamList} from './param_list';
import {ScreenName} from './screen_name';
import LoginSuccess from '../pages/auth/login_success';
import LoginRequest from '../pages/auth/login_request';

const Stack = createStackNavigator<AuthParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenName.loginResult} component={LoginSuccess} />
      <Stack.Screen name={ScreenName.login} component={LoginRequest} />
    </Stack.Navigator>
  );
}
