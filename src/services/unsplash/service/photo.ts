import API from './instance';
import { ListPhotoParams, UpdatePhotoParams } from '../params/photo_params';
import { LikeResponse } from "../models/LikeResponse";
import { FullPhoto } from '../models/Photo';

const Photo = {
  list: async (params: ListPhotoParams) => {
    const response = await API.get('/photos', {params});
    return response.data;
  },
  get: async (id: string) => {
    const response = await API.get<FullPhoto>(`/photos/${id}`)
    return response.data
  },
  random: async (params: ListPhotoParams) => {
    const response = await API.get('/photos/random', {params})
    return response.data
  },
  statistics: async (id: string) => {
    const response = await API.get(`/photos/${id}/statistics`)
    return response.data
  },
  track: async (id: string) => {
    const response = await API.get(`/photos/${id}/download`)
    return response.data
  },
  update: async (params: UpdatePhotoParams) => {
    const response = await API.put(`/photos/${params.id}`, {params})
    return response.data
  },
  like: async (id: string) => {
   const response = await API.post<LikeResponse>(`/photos/${id}/like`)
   console.log(response)
   return response.data
  },
  unLike: async (id: string) => {
    const response = await API.delete<LikeResponse>(`/photos/${id}/like`)
    return response.data
   },
};

export default Photo
