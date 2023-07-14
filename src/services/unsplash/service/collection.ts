import API from './instance';
import {
  AddPhotoToCollectionParams,
  CreateCollectionParams,
  GetCollectionPhotosParams,
  ListCollectionParams,
  RemovePhotoToCollectionParams,
} from '../params/collection_params';
import { Collection, FullCollection } from '../models/Collection';
import { Photo } from '../models/Photo';

const CollectionService = {
  list: async (params: ListCollectionParams) => {
    const response = await API.get<Collection[]>('/collections', {params});
    return response.data;
  },
  get: async (id: string) => {
    const response = await API.get<FullCollection>(`/collections/${id}`);
    return response.data;
  },
  getPhotos: async (params: GetCollectionPhotosParams) => {
    const response = await API.get<Photo[]>(`/collections/${params.id}/photos`, {
      params,
    });
    return response.data;
  },
  getRelated: async (id: string) => {
    const response = await API.get<Collection[]>(`/collections/${id}//related`);
    return response.data;
  },
  create: async (params: CreateCollectionParams) => {
    const response = await API.post(`/collections`, {params});
    return response.data;
  },
  update: async (id: string, params: CreateCollectionParams) => {
    const response = await API.put(`/collections/${id}`, {params});
    return response.data;
  },
  delete: async (id: string) => {
    const response = await API.delete(`/collections/${id}`);
    return response.data;
  },
  addPhoto: async (params: AddPhotoToCollectionParams) => {
    const response = await API.post(
      `/collections/${params.collection_id}/add`,
      {params},
    );
    return response.data;
  },
  removePhoto: async (params: RemovePhotoToCollectionParams) => {
    const response = await API.delete(
      `/collections/${params.collection_id}/remove`,
      {params},
    );
    return response.data;
  },
};

export default CollectionService;
