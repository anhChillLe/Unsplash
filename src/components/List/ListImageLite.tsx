import {FlatList, Pressable, StyleProp, View, ViewStyle} from 'react-native';
import {PlaceHolderMode} from '../../constants/place_holder';
import {Photo} from '../../services/api/type';
import FastImage from 'react-native-fast-image';
import {getImageUrl} from '../../ultilities/image_ulti';
import {ActivityIndicator} from 'react-native-paper';
import React from 'react';

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

  function Item({item, index}: {item: Photo, index: number}) {
    const photo = item as Photo;

    const itemHeight = (itemWidth * 4) / 3;
    const uri = getImageUrl(photo.urls.raw, itemWidth, itemHeight);

    return (
      <Pressable onPress={() => onItemPress(photo, index)}>
        <FastImage
          source={{uri}}
          style={{
            backgroundColor: photo.color ?? 'gray',
            borderRadius: 4,
            margin: space / 2,
            width: itemWidth,
            height: itemHeight,
          }}
        />
      </Pressable>
    );
  }

  const compareItem = (
    prevProps: Readonly<{item: Photo}>,
    nextProps: Readonly<{item: Photo}>,
  ) => prevProps.item.urls.raw === nextProps.item.urls.raw;

  const RenderItem = React.memo(Item, compareItem);

  const length = photos.length;
  const threshold = length === 0 ? 0 : itemThreshold / length;

  return (
    <FlatList
      data={photos}
      renderItem={({item, index}) => <RenderItem item={item} index={index}/>}
      numColumns={column}
      keyExtractor={item => item.id}
      style={style}
      ListFooterComponent={<ActivityIndicator style={{margin: 8}} />}
      ListHeaderComponent={header}
      onEndReached={length !== 0 ? onEndReached : () => {}}
      onEndReachedThreshold={threshold}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
}
