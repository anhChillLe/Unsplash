import { useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { OrderBy } from "../service/unsplash/constants/OrderBy"
import { Photo } from "../service/unsplash/models"

export interface ListPhotoViewMmodel {
	isLoading: boolean
	photos: Photo[]
	getPhotos: () => void
}

export default function getListPhotoViewmodel(order: OrderBy): ListPhotoViewMmodel {
	const [isLoading, setLoading] = useState<boolean>(false)
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)

	const getPhotos = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.photo
			.list({
				page: page.current + 1,
				per_page: 21,
				order_by: order,
			})
			.then((data) => {
				setPhotos([...photos, ...data])
				page.current += 1
				setLoading(false)
			})
			.catch((error) => {
				console.log(`getPhotos ${order}: `, error)
				setLoading(false)
			})
	}

	return {
		isLoading,
		photos,
		getPhotos,
	}
}
