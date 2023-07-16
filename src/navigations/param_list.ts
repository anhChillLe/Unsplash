import { RouteProp } from "@react-navigation/native"
import { ListType } from "../constants/list_type"
import { ScreenName } from "./screen_name"
import { SearchPhotosParams } from "../unsplash/params/search_params"
import { Collection, Photo, Topic, User } from "../unsplash/models"

export type AppParamList = {
	[ScreenName.home]: undefined
	[ScreenName.detail]: { photo: Photo }
	[ScreenName.topics]: undefined
	[ScreenName.collections]: undefined
	[ScreenName.allImage]: undefined
	[ScreenName.collectionPhotos]: { collection: Collection }
	[ScreenName.topicPhotos]: { topic: Topic }
	[ScreenName.detailPager]: { position: number; type: ListType }
	[ScreenName.search]: { query?: string }
	[ScreenName.searchResult]: { searchInput: SearchPhotosParams }
	[ScreenName.user]: { username: string }
	[ScreenName.currentUser]: undefined
	[ScreenName.userCollections]: { user: User }
	[ScreenName.userPhotos]: { user: User }
}

export type AuthParamList = {
	[ScreenName.login]: undefined
	[ScreenName.loginResult]: { code: string }
}

export type DetailRoute = { route: RouteProp<AppParamList, ScreenName.detail> }
export type DetailPagerRoute = { route: RouteProp<AppParamList, ScreenName.detailPager> }
export type CollectionPhotosRoute = { route: RouteProp<AppParamList, ScreenName.collectionPhotos> }
export type TopicPhotosRoute = { route: RouteProp<AppParamList, ScreenName.topicPhotos> }
export type SearchRoute = { route: RouteProp<AppParamList, ScreenName.search> }
export type SearchResultRoute = { route: RouteProp<AppParamList, ScreenName.searchResult> }
export type UserRoute = { route: RouteProp<AppParamList, ScreenName.user> }
export type UserCollectionsRoute = { route: RouteProp<AppParamList, ScreenName.userCollections> }
export type UserPhotosRoute = { route: RouteProp<AppParamList, ScreenName.userPhotos> }
export type LoginResultRoute = { route: RouteProp<AuthParamList, ScreenName.loginResult> }
