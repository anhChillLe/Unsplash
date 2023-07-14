import {User} from '../../api/type';
import { Photo } from './Photo';

export interface LikeResponse {
  photo: Photo;
  user: User;
}
