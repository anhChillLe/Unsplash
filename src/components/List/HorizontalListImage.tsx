import { ScrollView, Share, View } from "react-native"
import { StyleProp, ViewStyle } from "react-native"
import { ImageCard } from ".."
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { Photo } from "../../service/unsplash/models/Photo"
import { ReactElement } from "react"

export interface Props {
	data: Photo[]
	itemWidth: number
	itemHeight: number
	space: number
	maxItem?: number
	onItemPress?: (photo: Photo) => void
	isLoading?: boolean
	cardStyle?: StyleProp<ViewStyle>
	containerStyle?: StyleProp<ViewStyle>
}
export default function HorizontalImageList({
	data,
	itemWidth,
	itemHeight,
	space,
	isLoading = false,
	maxItem = 10,
	onItemPress = () => {},
	cardStyle,
	containerStyle,
}: Props): ReactElement {
	if (data.length >= maxItem) {
		data = data.slice(0, maxItem)
	}

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={containerStyle}>
			{isLoading ? (
				<ListSkeleton width={itemWidth} height={itemHeight} space={space} />
			) : (
				data.map((item, index) => (
					<ImageCard
						key={index.toString()}
						style={[index + 1 < data.length && { marginRight: space }, cardStyle]}
						photo={item}
						width={itemWidth}
						height={itemHeight}
						onPress={() => onItemPress(item)}
						placeHolderMode="color"
						quality="regular"
					/>
				))
			)}
		</ScrollView>
	)
}

function ListSkeleton({ width, height, space }: { width: number; height: number; space: number }): ReactElement {
	return (
		<SkeletonPlaceholder borderRadius={8}>
			<SkeletonPlaceholder.Item style={{ flexDirection: "row" }}>
				<SkeletonPlaceholder.Item width={width} height={height} marginEnd={space} />
				<SkeletonPlaceholder.Item width={width} height={height} marginEnd={space} />
				<SkeletonPlaceholder.Item width={width} height={height} marginEnd={space} />
				<SkeletonPlaceholder.Item width={width} height={height} marginEnd={space} />
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	)
}
