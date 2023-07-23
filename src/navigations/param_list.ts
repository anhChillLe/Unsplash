import { RouteProp } from "@react-navigation/native"
import { Screens } from "./screen_name"
import { SearchPhotosParams } from "../service/unsplash/params/search_params"
import { Collection, Photo, Topic, User } from "../service/unsplash/models"

export type AppParamList = {
	[Screens.home]: undefined
	[Screens.detail]: { photo: Photo }
	[Screens.topics]: undefined
	[Screens.collections]: undefined
	[Screens.allImage]: undefined
	[Screens.collectionPhotos]: { collection: Collection }
	[Screens.topicPhotos]: { id_or_slug: string }
	[Screens.search]: { query?: string }
	[Screens.searchResult]: { searchInput: SearchPhotosParams }
	[Screens.user]: { username: string }
	[Screens.currentUser]: undefined
	[Screens.userCollections]: { user: User }
	[Screens.userPhotos]: { user: User }
}

export type AuthParamList = {
	[Screens.login]: undefined
	[Screens.loginResult]: { code: string }
}

export type DetailRoute = { route: RouteProp<AppParamList, Screens.detail> }
export type CollectionPhotosRoute = { route: RouteProp<AppParamList, Screens.collectionPhotos> }
export type TopicPhotosRoute = { route: RouteProp<AppParamList, Screens.topicPhotos> }
export type SearchRoute = { route: RouteProp<AppParamList, Screens.search> }
export type SearchResultRoute = { route: RouteProp<AppParamList, Screens.searchResult> }
export type UserRoute = { route: RouteProp<AppParamList, Screens.user> }
export type UserCollectionsRoute = { route: RouteProp<AppParamList, Screens.userCollections> }
export type UserPhotosRoute = { route: RouteProp<AppParamList, Screens.userPhotos> }
export type LoginResultRoute = { route: RouteProp<AuthParamList, Screens.loginResult> }
