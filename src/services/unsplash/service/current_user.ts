import { FullUser } from '../models';
import API from './instance';

const CurrentUserService = {
  get: async () => {
    const response = await API.get<FullUser>('/me');
    return response.data;
  },
  update: async (params: UpdateUserProfieParams) => {
    const response = await API.put<FullUser>('/me', {params});
    return response.data;
  },
};

export default CurrentUserService;
