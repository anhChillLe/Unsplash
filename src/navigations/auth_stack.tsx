import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "../pages/landing/landing_page";
import RequestToken from "../pages/landing/login_success";
import { options } from "./options";
import { AuthParamList } from "./param_list";
import { Screens } from "./screen_name";

const Stack = createStackNavigator<AuthParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName={Screens.login} screenOptions={options}>
			<Stack.Screen name={Screens.loginResult} component={RequestToken} />
			<Stack.Screen name={Screens.login} component={LandingPage} />
		</Stack.Navigator>
	);
}
