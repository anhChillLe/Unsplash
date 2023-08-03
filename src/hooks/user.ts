import { useEffect, useRef, useState } from "react"
import { FullUser } from "../service/unsplash/models"
import unsplash from "../service/unsplash"

export default function useUser(username: string) {
	const [isLoading, setLoading] = useState(false)
	const [user, setUser] = useState<FullUser>()
	const isMouted = useRef(true)

	const getUser = () => {
		if (isLoading) return
		setLoading(true)
		unsplash.user
			.getProfile(username)
			.then(data => isMouted.current && setUser(data))
			.catch(error => console.error("getUser: ", error))
			.finally(() => isMouted.current && setLoading(false))
	}

	useEffect(() => {
		isMouted.current = true
		return () => {
			isMouted.current = false
		}
	}, [])

	useEffect(() => {
		getUser()
	}, [username])

	return {
		isLoading,
		profile: user,
	}
}
