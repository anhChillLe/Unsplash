import API from './instance';
import { ListPhotoParams, UpdatePhotoParams } from '../params/photo_params';
import { LikeResponse } from "../models/LikeResponse";
import { FullPhoto, Photo } from '../models/Photo';
import { Statistics } from '../models/Statistics';
import { Track } from '../models/Track';

const PhotoService = {
  list: async (params: ListPhotoParams) => {
    const response = await API.get<Photo[]>('/photos', {params});
    return response.data;
  },
  get: async (id: string) => {
    const response = await API.get<FullPhoto>(`/photos/${id}`)
    return response.data
  },
  random: async (params: ListPhotoParams) => {
    const response = await API.get<Photo>('/photos/random', {params})
    return response.data
  },
  statistics: async (id: string) => {
    const response = await API.get<Statistics>(`/photos/${id}/statistics`)
    return response.data
  },
  track: async (id: string) => {
    const response = await API.get<Track>(`/photos/${id}/download`)
    return response.data
  },
  update: async (input: UpdatePhotoParams) => { 
    const {id, ...params} = input
    const response = await API.put<FullPhoto>(`/photos/${id}`, {params})
    return response.data
  },
  like: async (id: string) => {
   const response = await API.post<LikeResponse>(`/photos/${id}/like`)
   console.log('Like response: ', response)
   return response.data
  },
  unLike: async (id: string) => {
    const response = await API.delete<LikeResponse>(`/photos/${id}/like`)
    return response.data
   },
};

export default PhotoService
