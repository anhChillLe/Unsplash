import { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { Surface, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Chart } from "../../components"
import { useUserStatisticsRoute } from "../../navigations/hooks"
import unsplash from "../../service/unsplash"
import { UserStatistics } from "../../service/unsplash/models"

export default function UserStatisticsScreen() {
	const route = useUserStatisticsRoute()
	const username = route.params.user.username
	const inset = useSafeAreaInsets()
	const theme = useTheme()
	const { width, height } = Dimensions.get("window")
	const safeWidth = width - 32

	const [statistics, setStatistics] = useState<UserStatistics>()
	const getStatistics = async () => {
		const statistics = await unsplash.user.statistics({ username })
		console.log(statistics)
		setStatistics(statistics)
	}

	useEffect(() => {
		getStatistics()
	}, [username])

	const downloads = statistics?.downloads.historical.values.map(it => it.value) ?? [0]
	const views = statistics?.views.historical.values.map(it => it.value / 1000) ?? [0]

	return (
		<Surface
			style={{
				flex: 1,
				paddingHorizontal: 16,
				paddingTop: inset.top,
				paddingBottom: inset.bottom,
			}}
		>
			<Chart data={views} width={safeWidth} height={200} />
			<Chart data={downloads} width={safeWidth} height={200} />
		</Surface>
	)
}
