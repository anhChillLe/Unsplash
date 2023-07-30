import { useEffect, useRef, useState } from "react"
import { FullCollection, Photo } from "../service/unsplash/models"
import unsplash from "../service/unsplash"

export default function useCollection(id: string) {
	const [isLoadingDetail, setLoadingDetail] = useState(false)
	const [isLoadingPhotos, setLoadingPhotos] = useState(false)
	const [collection, setCollection] = useState<FullCollection>()
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)

	const getCollection = () => {
		if (isLoadingDetail) return
		if (collection) return
		setLoadingDetail(true)
		unsplash.collection
			.get(id)
			.then((data) => setCollection(data))
			.catch((error) => console.error("getCollection: ", error))
			.finally(() => setLoadingDetail(false))
	}

	const getPhotos = () => {
		if (isLoadingPhotos) return
		setLoadingPhotos(true)
		const params = {
			id,
			page: page.current + 1,
			per_page: 21,
		}
		unsplash.collection
			.getPhotos(params)
			.then((data) => {
				setPhotos([...photos, ...data])
				page.current += 1
			})
			.catch((error) => console.log("getCollectionPhotos: ", error))
			.finally(() => setLoadingPhotos(false))
	}

	useEffect(() => {
		getCollection()
		getPhotos()
	}, [])

	return {
		photos,
		collection,
		loadMore: getPhotos,
	}
}
