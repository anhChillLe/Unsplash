import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScreenName} from '../../navigations/screen_name';
import AllImageScreen from './list_wallpaper';
import {Appbar, Divider, Surface, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../constants/colors';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {OrderBy} from 'unsplash-js';
import {BackAppBar} from '../../components';

export type PhotosParamList = {
  [ScreenName.imagesLatest]: {order: OrderBy};
  [ScreenName.imagesOldest]: {order: OrderBy};
  [ScreenName.imagesPopular]: {order: OrderBy};
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
        initialRouteName={ScreenName.imagesPopular}
        offscreenPageLimit={2}
        screenOptions={{
          tabBarStyle: {backgroundColor: Colors.transparent},
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
          tabBarPressColor: Colors.transparent,
        }}>
        <Tab.Screen
          name={ScreenName.imagesLatest}
          component={AllImageScreen}
          options={{
            title: 'Latest',
          }}
          initialParams={{order: OrderBy.LATEST}}
        />
        <Tab.Screen
          name={ScreenName.imagesOldest}
          component={AllImageScreen}
          options={{
            title: 'Oldest',
          }}
          initialParams={{order: OrderBy.OLDEST}}
        />
        <Tab.Screen
          name={ScreenName.imagesPopular}
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
