import API from "./instance";
import { GetTopicPhotosParams, ListTopicParams } from "../params/topic_params";

const Topic = {
  list: async (params: ListTopicParams) => {
    const response = API.get('/topics', {params})
    return (await response).data
  },
  get:async (id:string) => {
    const response = await API.get(`/topics/${id}`)
    return response.data
  },
  photos:async (params:GetTopicPhotosParams) => {
    const response = await API.get(`/topics/${params.id_or_slug}/photos`)
    return response.data
  }
}

export default Topic