import { BaseGroup, Photo, User } from "../service/unsplash/models"
import { SearchPhotosParams } from "../service/unsplash/params/search_params"
import { Screens } from "./screen_name"

export type AppParamList = {
	[Screens.home]: undefined
	[Screens.detail]: { photo: Photo }
	[Screens.topics]: undefined
	[Screens.collections]: undefined
	[Screens.allImage]: undefined
	[Screens.collectionPhotos]: { collection: BaseGroup }
	[Screens.topicPhotos]: { id_or_slug: string }
	[Screens.search]: undefined
	[Screens.searchResult]: { searchInput: SearchPhotosParams }
	[Screens.user]: { username: string }
	[Screens.currentUser]: undefined
	[Screens.userCollections]: { user: User }
	[Screens.userPhotos]: { user: User }
	[Screens.detailPager]: { photos: Photo[]; initPosition?: number }
	[Screens.editUserProfile]: undefined
	[Screens.userStatistics]: { user: User }
	[Screens.createCollection]?: { collection: BaseGroup }
}

export type AuthParamList = {
	[Screens.login]: undefined
	[Screens.loginResult]: { code: string }
}
