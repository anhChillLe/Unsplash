import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "../pages/landing/landing_page";
import RequestToken from "../pages/landing/login_success";
import { options } from "./options";
import { AuthParamList } from "./param_list";
import { ScreenName } from "./screen_name";

const Stack = createStackNavigator<AuthParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName={ScreenName.login} screenOptions={options}>
			<Stack.Screen name={ScreenName.loginResult} component={RequestToken} />
			<Stack.Screen name={ScreenName.login} component={LandingPage} />
		</Stack.Navigator>
	);
}
