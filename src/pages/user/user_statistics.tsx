import { useEffect, useState } from "react"
import { LineChart } from "react-native-chart-kit"
import { Surface, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { UserStatisticsRoute } from "../../navigations/param_list"
import unsplash from "../../service/unsplash"
import { UserStatistics } from "../../service/unsplash/models"
import { Dimensions } from "react-native"

export default function UserStatisticsScreen({ route }: UserStatisticsRoute) {
	const username = route.params?.user.username ?? ""
	const inset = useSafeAreaInsets()
	const theme = useTheme()
	const {width, height} = Dimensions.get('window')
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

	const downloads = statistics?.downloads.historical.values.map((it) => it.value / 1000) ?? [0]
	const views = statistics?.views.historical.values.map((it) => it.value / 1000) ?? [0]
	// console.log(statistics)

	const data = {
		labels: [],
		datasets: [
			{
				data: downloads,
				color: () => `red`,
				strokeWidth: 2,
			},
		],
	}

	const chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => theme.colors.primary,
		strokeWidth: 0, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional,
	}

	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
				paddingHorizontal: 16,
				paddingTop: inset.top,
				paddingBottom: inset.bottom,
			}}
		>
			<LineChart
				data={data}
				width={safeWidth}
				height={200}
				chartConfig={chartConfig}
				bezier
				fromZero
				withDots={false}
				withInnerLines={false}
			/>
		</Surface>
	)
}
