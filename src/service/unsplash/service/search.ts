import API from "./instance"
import { SearchPhotosParams } from "../params/search_params"
import { SearchCollectionResponse, SearchPhotoResponse, SearchUserResponse } from "../models/SearchResponse"

const SearchService = {
	photo: async (params: SearchPhotosParams) => {
		const response = await API.get<SearchPhotoResponse>("/search/photos", { params })
		return response.data
	},
	collection: async (params: SearchPhotosParams) => {
		const response = await API.get<SearchCollectionResponse>("/search/collections", { params })
		return response.data
	},
	user: async (params: SearchPhotosParams) => {
		const response = await API.get<SearchUserResponse>("/search/users", { params })
		return response.data
	},
}

export default SearchService
