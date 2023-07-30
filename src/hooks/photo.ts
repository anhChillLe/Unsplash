import { useEffect, useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { FullPhoto } from "../service/unsplash/models"

export default function usePhoto(id: string) {
	const [isLoading, setLoading] = useState<boolean>(false)
	const [fullPhoto, setFullPhoto] = useState<FullPhoto>()
	const isMounted = useRef(true)

	const getDetail = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.photo
			.get(id)
			.then(data => isMounted.current && setFullPhoto(data))
			.catch(error => console.log("getFullPhoto: ", error))
			.finally(() => isMounted.current && setLoading(false))
	}

	const like = () => {
		if (!fullPhoto) return
		const liked_by_user = fullPhoto.liked_by_user
		setLikeState(!liked_by_user)

		if (!liked_by_user)
			unsplash.photo
				.like(id)
				.then(data => isMounted.current && !data.photo.liked_by_user && setLikeState(false))
				.catch(error => console.error("Like: ", error))
		else
			unsplash.photo
				.unLike(id)
				.then(data => isMounted.current && data.photo.liked_by_user && setLikeState(true))
				.catch(error => console.error("Unlike: ", error))
	}

	function setLikeState(isLike: boolean) {
		if (!fullPhoto) return
		const newPhoto: FullPhoto = {
			...fullPhoto,
			liked_by_user: isLike,
			likes: isLike ? fullPhoto.likes + 1 : fullPhoto.likes - 1,
		}
		setFullPhoto(newPhoto)
	}

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		getDetail()
	}, [id])

	return {
		isLoading,
		fullPhoto,
		like,
    setLikeState,
	}
}
