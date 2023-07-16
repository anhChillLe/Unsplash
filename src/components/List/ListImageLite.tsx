import React from "react";
import { FlatList, Pressable, StyleProp, View, ViewStyle } from "react-native";
import { PlaceHolderMode } from "../../constants/place_holder";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "../../ultilities/image_ulti";
import { ActivityIndicator } from "react-native-paper";
import { Photo } from "../../unsplash/models";

type Props = {
	width: number;
	space: number;
	photos: Photo[];
	column: number;
	itemThreshold?: number;
	onEndReached?: () => void;
	onItemPress?: (photo: Photo, index: number) => void;
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	itemPlaceHolderMode?: PlaceHolderMode;
	header?: React.ReactElement;
};
export default function ListImageLite({
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
}: Props) {
	const itemWidth = (width - column * space) / column;
	const itemHeight = (itemWidth * 4) / 3;
	const length = photos.length;
	const threshold = length === 0 ? 0 : itemThreshold / length;

	const ImageItem = React.memo(Item, compareItem);
	
	function renderItem({item, index}:{item: Photo, index: number}) {
		return (
			<ImageItem {...{ item, index, itemWidth, itemHeight, space }} onPress={() => onItemPress(item, index)} />
		);
	}

	return (
		<FlatList
			data={photos}
			renderItem={renderItem}
			numColumns={column}
			keyExtractor={(item) => item.id}
			style={style}
			ListFooterComponent={<ActivityIndicator style={{ margin: 8 }} />}
			ListHeaderComponent={header}
			onEndReached={length !== 0 ? onEndReached : () => {}}
			onEndReachedThreshold={threshold}
			contentContainerStyle={contentContainerStyle}
			showsVerticalScrollIndicator={false}
		/>
	);
}

function Item({
	item,
	index,
	itemWidth,
	itemHeight,
	space,
	onPress,
}: {
	item: Photo;
	index: number;
	itemWidth: number;
	itemHeight: number;
	space: number;
	onPress?: () => void;
}) {
	const uri = getImageUrl(item.urls.raw, itemWidth, itemHeight);

	return (
		<Pressable onPress={onPress}>
			<FastImage
				source={{ uri }}
				style={{
					backgroundColor: item.color ?? "gray",
					borderRadius: 4,
					margin: space / 2,
					width: itemWidth,
					height: itemHeight,
				}}
			/>
		</Pressable>
	);
}

function compareItem(
	prevProps: Readonly<{ item: Photo }>,
	nextProps: Readonly<{ item: Photo }>
) {
	return prevProps.item.urls.raw === nextProps.item.urls.raw;
}
