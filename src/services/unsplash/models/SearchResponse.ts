import {Collection} from './Collection';
import {Photo} from './Photo';
import {User} from './User';

interface SearchResponse {
  total: number;
  total_pages: number;
}

export interface SearchPhotoResponse extends SearchResponse {
  results: Photo[];
}

export interface SearchCollectionResponse extends SearchResponse {
  results: Collection[];
}

export interface SearchUserResponse extends SearchResponse {
  results: User[];
}
