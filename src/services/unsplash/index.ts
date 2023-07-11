import Auth from './service/auth';
import Collection from './service/collection';
import CurrentUser from './service/current_user';
import Photo from './service/photo';
import Search from './service/search';
import Stats from './service/stats';
import Topic from './service/topic';
import User from './service/user';

const unsplashService = {
  auth: Auth,
  current_user: CurrentUser,
  user: User,
  stats: Stats,
  search: Search,
  photo: Photo,
  topic: Topic,
  collection: Collection,
};

export default unsplashService;
