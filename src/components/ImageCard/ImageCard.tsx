import { useState } from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { Card, useTheme } from "react-native-paper"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { Photo } from "../../unsplash/models/Photo"
import { Blurhash } from "react-native-blurhash"
import FastImage from "react-native-fast-image"
import { PlaceHolderMode } from "../../constants/place_holder"
import { Quality } from "../../constants/quality"
import { getImageUrl } from "../../ultilities/image_ulti"

interface Props {
	photo: Photo
	width: number | "full"
	height: number | "auto"
	roundness?: number
	onPress?: (photo: Photo) => void
	mode?: "elevated" | "contained" | "outlined"
	style?: StyleProp<ViewStyle>
	quality?: Quality
	placeHolderMode?: PlaceHolderMode
}

export default function ImageCard({
	photo,
	width,
	height,
	onPress = (photo) => {},
	roundness,
	style,
	mode = "outlined",
	placeHolderMode = "none",
	quality = "auto",
}: Props) {
	const [isLoading, setLoading] = useState(true)
	const startLoading = () => setLoading(true)
	const endLoading = () => setLoading(false)

	const theme = useTheme()
	if (width === "full") width = Dimensions.get("window").width
	if (height === "auto") height = (width * photo.height) / photo.width
	if (roundness === undefined) roundness = theme.roundness

	const uri = quality === "auto" ? getImageUrl(photo.urls.raw, width, height) : photo.urls[quality]

	return (
		<Card
			style={[style, { overflow: "hidden" }]}
			mode={mode}
			theme={{
				roundness,
				colors: {
					outline: "transparent",
				},
			}}
			onPress={() => onPress(photo)}
		>
			<FastImage
				onLoadStart={startLoading}
				onLoadEnd={endLoading}
				style={[
					{ width, height },
					placeHolderMode === "color" && photo.color != null && { backgroundColor: photo.color },
				]}
				source={{ uri }}
				resizeMode="cover"
			/>
			{placeHolderMode === "skeleton" && isLoading && (
				<View style={{ position: "absolute" }}>
					<SkeletonPlaceholder enabled={isLoading} borderRadius={roundness}>
						<SkeletonPlaceholder.Item width={width} height={height} />
					</SkeletonPlaceholder>
				</View>
			)}

			{placeHolderMode === "blurhash" && photo.blur_hash != null && isLoading && (
				<Blurhash
					blurhash={photo.blur_hash}
					style={{ width, height, position: "absolute", overflow: "hidden" }}
				/>
			)}
		</Card>
	)
}
