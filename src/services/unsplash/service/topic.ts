import API from './instance';
import {GetTopicPhotosParams, ListTopicParams} from '../params/topic_params';
import {FullTopic, Topic} from '../models/Topic';
import { Photo } from '../models/Photo';

const TopicService = {
  list: async (params: ListTopicParams) => {
    const response = API.get<Topic>('/topics', {params});
    return (await response).data;
  },
  get: async (id: string) => {
    const response = await API.get<FullTopic>(`/topics/${id}`);
    return response.data;
  },
  photos: async (params: GetTopicPhotosParams) => {
    const response = await API.get<Photo[]>(`/topics/${params.id_or_slug}/photos`);
    return response.data;
  },
};

export default TopicService;
