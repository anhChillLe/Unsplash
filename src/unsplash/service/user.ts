import API from "./instance"
import {
	GetUserStatisticsParams,
	ListPhotoUserLikeParams,
	ListUserCollectionParams,
	ListUserPhotosParams,
} from "../params/user_params"
import { Portfolio } from "../models/Portfolio"
import { Photo } from "../models/Photo"
import { UserStatistics } from "../models/Statistics"
import { Collection } from "../models/Collection"
import { FullUser } from "../models/User"

const UserService = {
	getProfile: async (username: string) => {
		const response = await API.get<FullUser>(`/users/${username}`)
		return response.data
	},
	getPortfolio: async (username: string) => {
		const response = await API.get<Portfolio>(`/users/${username}/portfolio`)
		return response.data
	},
	listPhotos: async (input: ListUserPhotosParams) => {
		const { username, ...params } = input
		const response = await API.get<Photo[]>(`/users/${username}/photos`, { params })
		return response.data
	},
	listLikedPhoto: async (input: ListPhotoUserLikeParams) => {
		const { username, ...params } = input
		const response = await API.get<Photo[]>(`/users/${username}/likes`, { params })
		return response.data
	},
	listCollection: async (input: ListUserCollectionParams) => {
		const { username, ...params } = input
		const response = await API.get<Collection[]>(`/users/${username}/collections`, { params })
		return response.data
	},
	statistics: async (input: GetUserStatisticsParams) => {
		const { username, ...params } = input
		const response = await API.get<UserStatistics>(`/users/${username}/statistics`, { params })
		return response.data
	},
}

export default UserService
