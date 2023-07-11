import API from './instance';
import { GetUserStatisticsParams, ListPhotoUserLikeParams, ListUserCollectionParams, ListUserPhotosParams } from '../params/user_params';
import { Portfolio } from '../models/Portfolio';
import { Photo } from '../models/Photo';
import { UserStatistics } from '../models/Statistics';
import { Collection } from '../models/Collection';
import { FullUser } from '../models/User';

const User = {
  getProfile: async (username: string) => {
    const response = await API.get<FullUser>(`/users/${username}`);
    return response.data;
  },
  getPortfolio: async (username: string) => {
    const response = await API.get<Portfolio>(`/users/${username}/portfolio`);
    return response.data;
  },
  listPhotos: async (params: ListUserPhotosParams) => {
    const response = await API.get<Photo[]>(`/users/${params.username}/photos`, {params})
    return response.data
  },
  listLikedPhoto: async (params: ListPhotoUserLikeParams) => {
    const response = await API.get<Photo[]>(`/users/${params.username}/likes`, {params})
    return response.data
  },
  listCollection: async (params: ListUserCollectionParams) => {
    const response = await API.get<Collection[]>(`/users/${params.username}/collections`, {params})
    return response.data
  },
  statistics: async (params: GetUserStatisticsParams) => {
    const response = await API.get<UserStatistics>(`/users/${params.username}/statistics`, {params})
    return response.data
  },
};

export default User
