import { useRef, useState } from "react"
import unsplashService from "../service/unsplash"
import { Photo } from "../service/unsplash/models/Photo"
import { User } from "../service/unsplash/models/User"

export interface UserPhotosViewModel {
	isLoading: boolean
	user: User
	photos: Photo[]
	getPhotos: () => void
	loadMore: () => void
}

export default function getUserPhotosViewModel(user: User) {
	const page = useRef<number>(0)
	const [isLoading, setLoading] = useState<boolean>(false)
	const [photos, setPhotos] = useState<Photo[]>([])

	const getPhotos = () => {
		if (isLoading) return

		setLoading(true)
		unsplashService.user
			.listPhotos({
				username: user.username,
				page: page.current + 1,
				per_page: 21,
			})
			.then((data) => {
				setPhotos([...photos, ...data])
				setLoading(false)
				page.current += 1
			})
			.catch((error) => {
				console.log("getUserPhotos: ", error)
				setLoading(false)
			})
	}

	const output: UserPhotosViewModel = {
		isLoading,
		user,
		photos,
		getPhotos,
		loadMore: getPhotos,
	}

	return output
}
