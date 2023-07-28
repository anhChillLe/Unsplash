import { useEffect, useState } from "react"
import { LineChart } from "react-native-chart-kit"
import { Card, Surface, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { UserStatisticsRoute } from "../../navigations/param_list"
import unsplash from "../../service/unsplash"
import { UserStatistics } from "../../service/unsplash/models"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { LineChartData, LineChartProps } from "react-native-chart-kit/dist/line-chart/LineChart"
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart"
import { Chart } from "../../components"

export default function UserStatisticsScreen({ route }: UserStatisticsRoute) {
	const username = route.params?.user.username ?? ""
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
		// getStatistics()
	}, [username])

	const downloads = statistics?.downloads.historical.values.map((it) => it.value) ?? [0]
	const downloadsDate = statistics?.downloads.historical.values.map((it) => it.date) ?? [" "]
	const views = statistics?.views.historical.values.map((it) => it.value / 1000) ?? [0]

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
			<Chart data={downloads} width={safeWidth} height={200}/>
			<Chart2 data={views} width={safeWidth} height={200} />
		</Surface>
	)
}

function Chart2({
	data,
	width,
	height,
	style,
}: {
	data: number[]
	width: number
	height: number
	style?: StyleProp<ViewStyle>
}) {
	const theme = useTheme()

	const chartData: LineChartData = {
		labels: [],
		datasets: [
			{
				data,
				color: () => theme.colors.primary,
				strokeWidth: 2,
			},
		],
	}

	const chartConfig: AbstractChartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => theme.colors.primary,
		strokeWidth: 0, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional,

		count: 10,
	}

	return (
		<Card mode="contained" style={[style]}>
			<LineChart
				data={chartData}
				width={width}
				height={height}
				chartConfig={chartConfig}
				bezier
				fromZero
				withDots={false}
				withInnerLines={false}
				withOuterLines={false}
				withVerticalLabels={false}
				yLabelsOffset={8}
				formatYLabel={(value) => {
					return (+value).shorten()
				}}
				segments={4}
			/>
		</Card>
	)
}
