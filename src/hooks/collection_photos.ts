import { useEffect, useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { Photo } from "../service/unsplash/models"

export default function useCollectionPhotos(id: string) {
	const [isLoading, setLoading] = useState(false)
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)
	const isMounted = useRef(true)

	const getPhotos = () => {
		if (isLoading) return
		setLoading(true)
		const params = {
			id,
			page: page.current + 1,
			per_page: 21,
		}
		unsplash.collection
			.getPhotos(params)
			.then(data => {
				if (!isMounted.current) return
				setPhotos([...photos, ...data])
				page.current++
			})
			.catch(error => console.error("getCollectionPhotos: ", error))
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
	}, [id])

	return {
		photos,
		loadMore: getPhotos
	}
}
