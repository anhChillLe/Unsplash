import { useRef, useState } from "react"
import { Photo } from "../unsplash/models"
import unsplashService from "../unsplash"
import { SearchPhotosParams } from "../unsplash/params/search_params"

export interface SearchViewmodel {
	isLoading: boolean
	photos: Photo[]
	total: number
	getPhotos: () => void
}

export default function getSearchViewModel(searchInput: SearchPhotosParams): SearchViewmodel {
	const [isLoading, setLoading] = useState(false)
	const [photos, setPhotos] = useState<Photo[]>([])
	const [total, setTotal] = useState(0)
	const page = useRef(0)

	const getPhotos = () => {
		if (isLoading) return

		setLoading(true)
		unsplashService.search
			.photo({
				...searchInput,
				page: page.current + 1,
				per_page: 20,
			})
			.then((data) => {
				setPhotos([...photos, ...data.results])
				setTotal(data.total)
				setLoading(false)
				page.current++
			})
			.catch((error) => {
				console.log("getSearchResult: ", error)
				setLoading(false)
			})
	}

	return {
		isLoading,
		photos,
		total,
		getPhotos,
	}
}