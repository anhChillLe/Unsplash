import API from '.';
import {UserProfile} from './models/userProfile';

type UpdateUserParams = {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  location?: string;
  bio?: string;
  instagram_username?: string;
};

const UserService = {
  getCurrentUser: async () => {
    const response = await API.get<UserProfile>('/me');
    return response.data;
  },
  updateUserProfile(params: UpdateUserParams) {
    if (Object.keys(params).length === 0) {
      throw Error('Update profile is empty');
    }
    return API.put<UserProfile>('/me', {params});
  },
};

export default UserService;
