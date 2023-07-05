import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AppParamList} from './param_list';
import {ScreenName} from './screen_name';
import HomeScreen from '../pages/home/home_screen';
import DetailScreen from '../pages/detail/detail_screen';
import TopicScreen from '../pages/topics/topics_screen';
import CollectionScreen from '../pages/collections/collections_screen';
import TopNavigationListImage from '../pages/list/list_wallpaper_group';
import CollectionPhoto from '../pages/collections/collection_photos';
import TopicDetail from '../pages/topics/topic_photos';
import DetailViewPager from '../pages/detail/detail_pager';
import SearchScreen from '../pages/search/search_screen';
import SearchResultScreen from '../pages/search/search_result';

const Stack = createStackNavigator<AppParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.home}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenName.home} component={HomeScreen} />
      <Stack.Screen name={ScreenName.detail} component={DetailScreen} />
      <Stack.Screen name={ScreenName.topics} component={TopicScreen} />
      <Stack.Screen
        name={ScreenName.collections}
        component={CollectionScreen}
      />
      <Stack.Screen
        name={ScreenName.allImage}
        component={TopNavigationListImage}
      />
      <Stack.Screen
        name={ScreenName.collectionPhotos}
        component={CollectionPhoto}
      />
      <Stack.Screen name={ScreenName.topicPhotos} component={TopicDetail} />
      <Stack.Screen
        name={ScreenName.detailPager}
        component={DetailViewPager}
      />
      <Stack.Screen
        name={ScreenName.search}
        component={SearchScreen}
      />

      <Stack.Screen
        name={ScreenName.searchResult}
        component={SearchResultScreen}
      />
    </Stack.Navigator>
  );
}
