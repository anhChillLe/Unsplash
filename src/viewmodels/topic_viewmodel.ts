import { useRef, useState } from "react"
import unsplashService from "../unsplash"
import { FullTopic, Photo } from "../unsplash/models"

export interface TopicViewmodel {
	isLoadingDetail: boolean
	isLoadingPhotos: boolean
	detail?: FullTopic
	photos: Photo[]
	getTopic: () => void
	getPhotos: () => void
}

export default function getTopicViewmodel(id_or_slug: string): TopicViewmodel {
	const [isLoadingDetail, setLoadingDetail] = useState(false)
	const [isLoadingPhotos, setLoadingPhotos] = useState(false)
	const [detail, setDetail] = useState<FullTopic | undefined>()
	const [photos, setPhotos] = useState<Photo[]>([])
	const page = useRef(0)

	const getTopic = () => {
		if (isLoadingDetail) return
		setLoadingDetail(true)
		unsplashService.topic
			.get(id_or_slug)
			.then((data) => {
				setDetail(data)
				setLoadingDetail(false)
			})
			.catch((error) => {
				console.log("getTopic: ", error)
				setLoadingDetail(false)
			})
	}

	const getPhotos = () => {
		if (isLoadingPhotos) return
		setLoadingPhotos(true)
		unsplashService.topic
			.getPhotos({
				id_or_slug,
				page: page.current + 1,
				per_page: 21,
			})
			.then((data) => {
				setPhotos([...photos, ...data])
				setLoadingPhotos(false)
				page.current += 1
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
		getTopic,
		getPhotos,
	}
}
