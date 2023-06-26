import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRef} from 'react';
import {ScreenName} from './screen_name';
import HomeScreen from '../pages/home/home_screen';
import DetailScreen from '../pages/detail/detail_screen';
import {Photo} from '../services/api/type';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

export type RootStackParamList = {
  [ScreenName.home]: undefined;
  [ScreenName.detail]: {photo: Photo};
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function Root() {
  const navRef = useRef();

  return (
    <NavigationContext.Provider value={navRef.current}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={ScreenName.home}
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <RootStack.Screen name={ScreenName.home} component={HomeScreen} />
          <RootStack.Screen name={ScreenName.detail} component={DetailScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
}
