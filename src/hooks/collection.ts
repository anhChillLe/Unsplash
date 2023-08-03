import { useEffect, useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { FullCollection } from "../service/unsplash/models"

export default function useCollection(id: string) {
	const [isLoading, setLoading] = useState(false)
	const [collection, setCollection] = useState<FullCollection>()
	const isMounted = useRef(true)

	const getCollection = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.collection
			.get(id)
			.then((data) => isMounted.current && setCollection(data))
			.catch((error) => console.error("getCollection: ", error))
			.finally(() => isMounted.current && setLoading(false))
	}

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		getCollection()
	}, [id])

	return {
		isLoading,
		collection,
	}
}