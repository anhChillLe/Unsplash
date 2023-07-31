import React from "react"
import { FlatList, Pressable, StyleProp, View, ViewStyle } from "react-native"
import { PlaceHolderMode } from "../../constants/place_holder"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { getImageUrl } from "../../ultilities/image_ulti"
import { ActivityIndicator } from "react-native-paper"
import { Photo } from "../../service/unsplash/models"

type Props = {
	width: number
	space: number
	photos: Photo[]
	column: number
	itemThreshold?: number
	onEndReached?: () => void
	onItemPress?: (photo: Photo, index: number) => void
	style?: StyleProp<ViewStyle>
	contentContainerStyle?: StyleProp<ViewStyle>
	itemPlaceHolderMode?: PlaceHolderMode
	header?: React.ReactElement
	showLoadingFooter?: boolean
}
export default function ListPhoto({
	width,
	space,
	photos,
	column,
	style,
	itemThreshold = 0,
	onEndReached = () => {},
	onItemPress = (photo, index) => {},
	contentContainerStyle,
	header,
	showLoadingFooter = true
}: Props) {
	const itemWidth = (width - column * space) / column
	const itemHeight = (itemWidth * 4) / 3
	const threshold = photos.length === 0 ? 0 : itemThreshold / photos.length

	function renderItem({ item, index }: { item: Photo; index: number }) {
		return (
			<ImageItem
				photo={item}
				width={itemWidth}
				height={itemHeight}
				style={{ width: itemWidth, height: itemHeight, margin: space / 2 }}
				onPress={() => onItemPress(item, index)}
			/>
		)
	}

	return (
		<FlatList
			data={photos}
			renderItem={renderItem}
			numColumns={column}
			keyExtractor={(item) => item.id}
			style={style}
			ListFooterComponent={showLoadingFooter ? <ActivityIndicator style={{ margin: 8 }} /> : null}
			ListHeaderComponent={header}
			onEndReached={photos.length !== 0 ? onEndReached : () => {}}
			onEndReachedThreshold={threshold}
			contentContainerStyle={contentContainerStyle}
			showsVerticalScrollIndicator={false}
		/>
	)
}

const ImageItem = React.memo(Item, compareItem)

function Item({
	photo,
	width,
	height,
	style,
	onPress,
}: {
	photo: Photo
	style?: ImageStyle
	width: number
	height: number
	onPress?: () => void
}) {
	const uri = getImageUrl(photo.urls.raw, width, height)

	return (
		<Pressable onPress={onPress}>
			<FastImage
				source={{ uri }}
				style={[
					style,
					{
						backgroundColor: photo.color ?? "gray",
						borderRadius: 4,
					},
				]}
			/>
		</Pressable>
	)
}

function compareItem(prevProps: Readonly<{ photo: Photo }>, nextProps: Readonly<{ photo: Photo }>) {
	return prevProps.photo.urls.raw === nextProps.photo.urls.raw
}
