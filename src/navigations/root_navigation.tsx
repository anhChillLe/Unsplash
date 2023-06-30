import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRef} from 'react';
import {ScreenName} from './screen_name';
import HomeScreen from '../pages/home/home_screen';
import DetailScreen from '../pages/detail/detail_screen';
import {Collection, Photo, Topic} from '../services/api/type';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import TopicScreen from '../pages/topics/topics_screen';
import CollectionScreen from '../pages/collections/collections_screen';
import AllImageScreen from '../pages/list/list_wallpaper';
import TopNavigationListImage from './list_top_navigation';
import CollectionPhoto from '../pages/collections/collection_photos';
import TopicPhotos from '../pages/topics/topic_photos';

export type RootStackParamList = {
  [ScreenName.home]: undefined;
  [ScreenName.detail]: {photo: Photo};
  [ScreenName.topics]: undefined;
  [ScreenName.collections]: undefined;
  [ScreenName.allImage]: undefined;
  [ScreenName.CollectionPhotos]: {collection: Collection}
  [ScreenName.TopicPhotos]: {topic: Topic}
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
          <RootStack.Screen name={ScreenName.topics} component={TopicScreen}/>
          <RootStack.Screen name={ScreenName.collections} component={CollectionScreen}/>
          <RootStack.Screen name={ScreenName.allImage} component={TopNavigationListImage}/>
          <RootStack.Screen name={ScreenName.CollectionPhotos} component={CollectionPhoto}/>
          <RootStack.Screen name={ScreenName.TopicPhotos} component={TopicPhotos} />
        </RootStack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
}
