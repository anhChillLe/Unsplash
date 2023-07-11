import {UserProfile} from '../models';
import API from './instance';

const CurrentUser = {
  get: async () => {
    const response = await API.get<UserProfile>('/me');
    console.log('getCurrentUser: ', response.cached);
    return response.data;
  },
  update: async (params: UpdateUserProfieParams) => {
    const response = await API.put<UserProfile>('/me', {params});
    return response.data;
  },
};

export default CurrentUser;
