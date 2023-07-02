import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScreenName} from './screen_name';
import AllImageScreen from '../pages/list/list_wallpaper';
import {Appbar, Divider, Surface, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../constants/colors';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {OrderBy} from 'unsplash-js';
import {BackAppBar} from '../components';

export type PhotosParamList = {
  [ScreenName.ListImageLatest]: {order: OrderBy};
  [ScreenName.ListImageOldest]: {order: OrderBy};
  [ScreenName.ListImagePopular]: {order: OrderBy};
};

const Tab = createMaterialTopTabNavigator<PhotosParamList>();

export default function TopNavigationListImage() {
  const {top, bottom} = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Surface
      mode="flat"
      style={{flex: 1, height: '100%', paddingTop: top, paddingBottom: bottom}}>
      <BackAppBar />
      <Divider />
      <Tab.Navigator
        initialRouteName={ScreenName.ListImagePopular}
        offscreenPageLimit={2}
        screenOptions={{
          tabBarStyle: {backgroundColor: Colors.transparent},
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
          tabBarPressColor: Colors.transparent,
        }}>
        <Tab.Screen
          name={ScreenName.ListImageLatest}
          component={AllImageScreen}
          options={{
            title: 'Latest',
          }}
          initialParams={{order: OrderBy.LATEST}}
        />
        <Tab.Screen
          name={ScreenName.ListImageOldest}
          component={AllImageScreen}
          options={{
            title: 'Oldest',
          }}
          initialParams={{order: OrderBy.OLDEST}}
        />
        <Tab.Screen
          name={ScreenName.ListImagePopular}
          component={AllImageScreen}
          options={{
            title: 'Popular',
          }}
          initialParams={{order: OrderBy.POPULAR}}
        />
      </Tab.Navigator>
    </Surface>
  );
}
