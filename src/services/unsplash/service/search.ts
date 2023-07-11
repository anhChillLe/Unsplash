import API from "./instance";
import { SearchPhotosParams } from "../params/search_params";

const Search = {
  photo: async (params: SearchPhotosParams) => {
    const response = await API.get('/search/photos', {params})
    return response.data
  },
  collection: async (params: SearchPhotosParams) => {
    const response = await API.get('/search/collections', {params})
    return response.data
  },
  user: async (params: SearchPhotosParams) => {
    const response = await API.get('/search/users', {params})
    return response.data
  }
}

export default Search