import { useState, useRef, useCallback, useEffect } from "react"
import unsplash from "../service/unsplash"
import { User, Collection } from "../service/unsplash/models"

export function useUserCollections(username: string) {
	const [isLoading, setLoading] = useState(false)
	const [collections, setCollections] = useState<Collection[]>([])
	const page = useRef(0)

	const listCollection = useCallback(() => {
		setLoading(true)
		unsplash.user
			.listCollection({ username, page: page.current + 1, per_page: 10 })
			.then((data) => {
				setCollections([...collections, ...data])
				page.current += 1
			})
			.catch((error) => {
				console.error("Get current user collections: ", error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [username])

	useEffect(() => {
		listCollection()
	}, [username])

	return {
		isLoading,
		collections,
		loadMore: listCollection,
	}
}
