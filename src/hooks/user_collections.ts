import { useCallback, useEffect, useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { Collection } from "../service/unsplash/models"

export default function useUserCollections(username: string) {
	const [isLoading, setLoading] = useState(false)
	const [collections, setCollections] = useState<Collection[]>([])
	const page = useRef(0)
	const isMounted = useRef(true)

	const getCollections = useCallback(() => {
		if(isLoading) return

		setLoading(true)
		unsplash.user
			.listCollection({ username, page: page.current + 1, per_page: 10 })
			.then(data => {
				if(!isMounted.current) return
				setCollections([...collections, ...data])
				page.current += 1
			})
			.catch(error => console.error("Get current user collections: ", error))
			.finally(() => isMounted.current && setLoading(false))
	}, [username])

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		getCollections()
	}, [username])

	return {
		isLoading,
		collections,
		loadMore: getCollections,
	}
}
