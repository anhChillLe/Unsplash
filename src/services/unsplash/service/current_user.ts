import API from './instance';

const CurrentUser = {
  get: async () => {
    const response = await API.get('/me');
    return response.data;
  },
  update: async (params: UpdateUserProfieParams) => {
    const response = await API.put('/me', {params});
    return response.data;
  },
};

export default CurrentUser;

import { Basic } from 'unsplash-js/dist/methods/users/types';