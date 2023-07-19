import { createStackNavigator } from "@react-navigation/stack"
import CollectionPhoto from "../pages/collections/collection_photos"
import CollectionScreen from "../pages/collections/collections_screen"
import DetailScreen from "../pages/detail/detail_screen"
import HomeScreen from "../pages/home/HomeScreen"
import TopNavigationListImage from "../pages/list/list_photo_group"
import SearchResultScreen from "../pages/search/search_result"
import SearchScreen from "../pages/search/search_screen"
import TopicDetail from "../pages/topics/topic_photos"
import TopicScreen from "../pages/topics/topics_screen"
import CurrentUserPage from "../pages/user/current_user_page"
import UserCollectionPage from "../pages/user/user_collection"
import UserPage from "../pages/user/user_page"
import UserPhotoPage from "../pages/user/user_photo"
import { options } from "./options"
import { AppParamList } from "./param_list"
import { ScreenName } from "./screen_name"

const Stack = createStackNavigator<AppParamList>()

export default function AppStack() {
	return (
		<Stack.Navigator initialRouteName={ScreenName.home} screenOptions={options}>
			<Stack.Screen name={ScreenName.home} component={HomeScreen} />
			<Stack.Screen name={ScreenName.detail} component={DetailScreen} />
			<Stack.Screen name={ScreenName.topics} component={TopicScreen} />
			<Stack.Screen name={ScreenName.collections} component={CollectionScreen} />
			<Stack.Screen name={ScreenName.allImage} component={TopNavigationListImage} />
			<Stack.Screen name={ScreenName.collectionPhotos} component={CollectionPhoto} />
			<Stack.Screen name={ScreenName.topicPhotos} component={TopicDetail} />
			<Stack.Screen name={ScreenName.search} component={SearchScreen} />
			<Stack.Screen name={ScreenName.searchResult} component={SearchResultScreen} />
			<Stack.Screen name={ScreenName.user} component={UserPage} />
			<Stack.Screen name={ScreenName.currentUser} component={CurrentUserPage} />
			<Stack.Screen name={ScreenName.userCollections} component={UserCollectionPage} />
			<Stack.Screen name={ScreenName.userPhotos} component={UserPhotoPage} />
		</Stack.Navigator>
	)
}
