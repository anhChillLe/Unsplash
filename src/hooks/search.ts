import { useState, useRef, useEffect } from "react"
import unsplash from "../service/unsplash"
import { Photo } from "../service/unsplash/models"
import { SearchPhotosParams } from "../service/unsplash/params/search_params"

export default function useSearch(searchInput: SearchPhotosParams) {
	const [isLoading, setLoading] = useState(false)
	const [photos, setPhotos] = useState<Photo[]>([])
	const [total, setTotal] = useState(0)
	const page = useRef(0)
	const isMounted = useRef(true)

	const getPhotos = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.search
			.photo({
				...searchInput,
				page: page.current + 1,
				per_page: 20,
			})
			.then(data => {
				if (!isMounted.current) return
				setPhotos([...photos, ...data.results])
				setTotal(data.total)
				page.current++
			})
			.catch(error => console.log("getSearchResult: ", error))
			.finally(() => isMounted.current && setLoading(false))
	}

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		getPhotos()
	}, [searchInput])

	return {
		isLoading,
		total,
		photos,
		loadMore: getPhotos,
	}
}
