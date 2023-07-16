import API from "./instance"
import { GetTopicPhotosParams, ListTopicParams } from "../params/topic_params"
import { FullTopic, Topic } from "../models/Topic"
import { Photo } from "../models/Photo"

const TopicService = {
	list: async (params: ListTopicParams) => {
		const response = API.get<Topic[]>("/topics", { params })
		return (await response).data
	},
	get: async (id: string) => {
		const response = await API.get<FullTopic>(`/topics/${id}`)
		return response.data
	},
	getPhotos: async (input: GetTopicPhotosParams) => {
		const { id_or_slug, ...params } = input
		const response = await API.get<Photo[]>(`/topics/${id_or_slug}/photos`, { params })
		return response.data
	},
}

export default TopicService
