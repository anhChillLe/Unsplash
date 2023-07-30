import { useEffect, useRef, useState } from "react"
import { OrderBy } from "../service/unsplash/constants/OrderBy"
import { Photo } from "../service/unsplash/models"
import unsplash from "../service/unsplash"

export default function useListPhoto(order_by: OrderBy) {
	const [isLoading, setLoading] = useState(false)
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)
	const isMounted = useRef(true)

	const getPhotos = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.photo
			.list({
				page: page.current + 1,
				per_page: 21,
				order_by,
			})
			.then(data => {
				if (!isMounted.current) return
				setPhotos([...photos, ...data])
				page.current += 1
			})
			.catch(error => console.error(`getPhotos ${order_by}: `, error))
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
	}, [order_by])

	return {
		isLoading,
		photos,
		loadMore: getPhotos,
	}
}
