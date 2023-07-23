import { useRef, useState } from "react"
import { FullCollection, Photo } from "../service/unsplash/models"
import unsplash from "../service/unsplash"

export interface CollectionViewmodel {
	isLoadingDetail: boolean
	isLoadingPhotos: boolean
	detail?: FullCollection
	photos: Photo[]
	getCollection: () => void
	getPhotos: () => void
}

export default function getCollectionViewmodel(id: string): CollectionViewmodel {
	const [isLoadingDetail, setLoadingDetail] = useState(false)
	const [isLoadingPhotos, setLoadingPhotos] = useState(false)
	const [detail, setDetail] = useState<FullCollection | undefined>()
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)

	const getCollection = () => {
		if (isLoadingDetail) return
		setLoadingDetail(true)
		unsplash.collection
			.get(id)
			.then((data) => {
				setDetail(data)
				setLoadingDetail(false)
			})
			.catch((error) => {
				console.log("getCollection: ", error)
				setLoadingDetail(false)
			})
	}

	const getPhotos = () => {
		if (isLoadingPhotos) return
		setLoadingPhotos(true)
		unsplash.collection
			.getPhotos({
				id,
				page: page.current + 1,
				per_page: 21,
			})
			.then((data) => {
				setPhotos([...photos, ...data])
				setLoadingPhotos(false)
				page.current++
			})
			.catch((error) => {
				console.log("getCollectionPhotos: ", error)
			})
	}

	return {
		isLoadingDetail,
		isLoadingPhotos,
		photos,
		detail,
		getCollection,
		getPhotos,
	}
}
