import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppParamList, AuthParamList } from "./param_list"
import { Screens } from "./screen_name"

type AppNavigationProps = StackNavigationProp<AppParamList>
export const useAppNavigation = useNavigation<AppNavigationProps>

type DetailRoute = RouteProp<AppParamList, Screens.detail>
type DetailPagerRoute = RouteProp<AppParamList, Screens.detailPager>
type CollectionPhotosRoute = RouteProp<AppParamList, Screens.collectionPhotos>
type TopicPhotosRoute = RouteProp<AppParamList, Screens.topicPhotos>
type SearchRoute = RouteProp<AppParamList, Screens.search>
type SearchResultRoute = RouteProp<AppParamList, Screens.searchResult>
type UserRoute = RouteProp<AppParamList, Screens.user>
type UserCollectionsRoute = RouteProp<AppParamList, Screens.userCollections>
type UserPhotosRoute = RouteProp<AppParamList, Screens.userPhotos>
type LoginResultRoute = RouteProp<AuthParamList, Screens.loginResult>
type UserStatisticsRoute = RouteProp<AppParamList, Screens.userStatistics>

export const useDetaiRoute = useRoute<DetailRoute>
export const useDetailPagerRoute = useRoute<DetailPagerRoute>
export const useCollectionPhotosRoute = useRoute<CollectionPhotosRoute>
export const useTopicPhotosRoute = useRoute<TopicPhotosRoute>
export const useSearchRoute = useRoute<SearchRoute>
export const useSearchResultRoute = useRoute<SearchResultRoute>
export const useUserRoute = useRoute<UserRoute>
export const useUserCollectionsRoute = useRoute<UserCollectionsRoute>
export const useUserPhotosRoute = useRoute<UserPhotosRoute>
export const useLoginResultRoute = useRoute<LoginResultRoute>
export const useUserStatisticsRoute = useRoute<UserStatisticsRoute>