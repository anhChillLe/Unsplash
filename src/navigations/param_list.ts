import { ListType } from "../constants/list_type";
import { SearchInput } from "../redux/features/search/actions";
import { Collection, Photo, Topic } from "../services/api/type";
import { ScreenName } from "./screen_name";

export type AppParamList = {
  [ScreenName.home]: undefined;
  [ScreenName.detail]: {photo: Photo};
  [ScreenName.topics]: undefined;
  [ScreenName.collections]: undefined;
  [ScreenName.allImage]: undefined;
  [ScreenName.collectionPhotos]: {collection: Collection};
  [ScreenName.topicPhotos]: {topic: Topic};
  [ScreenName.detailPager]: {position: number; type: ListType};
  [ScreenName.search]: {query?: string};
  [ScreenName.searchResult]: {searchInput: SearchInput};
};

export type AuthParamList = {
  [ScreenName.login]: undefined;
  [ScreenName.loginResult]: {code: string}  
}