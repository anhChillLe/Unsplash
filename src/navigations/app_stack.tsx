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
import { Screens } from "./screen_name"

const Stack = createStackNavigator<AppParamList>()

export default function AppStack() {
	return (
		<Stack.Navigator initialRouteName={Screens.home} screenOptions={options}>
			<Stack.Screen name={Screens.home} component={HomeScreen} />
			<Stack.Screen name={Screens.detail} component={DetailScreen} />
			<Stack.Screen name={Screens.topics} component={TopicScreen} />
			<Stack.Screen name={Screens.collections} component={CollectionScreen} />
			<Stack.Screen name={Screens.allImage} component={TopNavigationListImage} />
			<Stack.Screen name={Screens.collectionPhotos} component={CollectionPhoto} />
			<Stack.Screen name={Screens.topicPhotos} component={TopicDetail} />
			<Stack.Screen name={Screens.search} component={SearchScreen} />
			<Stack.Screen name={Screens.searchResult} component={SearchResultScreen} />
			<Stack.Screen name={Screens.user} component={UserPage} />
			<Stack.Screen name={Screens.currentUser} component={CurrentUserPage} />
			<Stack.Screen name={Screens.userCollections} component={UserCollectionPage} />
			<Stack.Screen name={Screens.userPhotos} component={UserPhotoPage} />
		</Stack.Navigator>
	)
}
