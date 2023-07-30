import { useEffect, useRef, useState } from "react"
import unsplash from "../service/unsplash"
import { FullTopic } from "../service/unsplash/models"

export default function useTopic(id: string) {
	const [isLoading, setLoading] = useState(false)
	const [topic, setTopic] = useState<FullTopic>()
	const isMounted = useRef(true)

	const getTopic = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.topic
			.get(id)
			.then((data) => isMounted.current && setTopic(data))
			.catch((error) => console.error("getTopic: ", error))
			.finally(() => isMounted.current && setLoading(false))
	}

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		getTopic()
	}, [id])

	return {
		isLoading,
		topic,
	}
}