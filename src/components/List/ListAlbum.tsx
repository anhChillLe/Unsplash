import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import {Collection, Topic} from '../../services/api/type';
import ImageCard from '../ImageCard/ImageCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  data: Topic[] | Collection[] | any[];
  column: number;
  space: number;
  width: number;
  isLoading?: boolean;
  mode?: 'compact' | 'list';
  itemRatio?: number;
  maxItems?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

function ListAlbums({
  data,
  column,
  space,
  width,
  isLoading = false,
  mode = 'compact',
  itemRatio = 3 / 2,
  maxItems = 4,
  containerStyle,
}: Props) {
  const itemWidth = (width - (column - 1) * space) / column;

  const getItemMarginEnd = (index: number) => {
    if ((index + 1) % column == 0) return 0;
    else return space;
  };

  const getItemMarginBottom = (index: number) => {
    if (index < data.length - column) return space;
    else return 2;
  };

  if (maxItems && data.length > maxItems) {
    data = data.slice(0, maxItems);
  }
  function SkeletonList() {
    return (
      <SkeletonPlaceholder borderRadius={8}>
        <SkeletonPlaceholder.Item
          style={[{flexDirection: 'row', flexWrap: 'wrap'}, containerStyle]}>
          {[...Array(maxItems)].map((_, index) => {
            const marginEnd = getItemMarginEnd(index);
            const marginBottom = getItemMarginBottom(index);

            return (
              <SkeletonPlaceholder.Item
                key={index.toString()}
                width={itemWidth}
                height={itemWidth / itemRatio}
                style={{marginEnd, marginBottom}}
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  }

  function Album({item, index}: {item: any; index: number}) {
    const marginEnd = getItemMarginEnd(index);
    const marginBottom = getItemMarginBottom(index);

    return (
      <View style={{marginEnd, marginBottom}}>
        <ImageCard
          photo={item.cover_photo}
          width={itemWidth}
          height={itemWidth / itemRatio}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingLeft: 12,
            paddingBottom: 12,
            paddingEnd: 8,
            paddingTop: 8,
          }}>
          <Text
            variant="titleLarge"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{color: 'white', fontWeight: '500'}}>
            {item.title}
          </Text>
          <Text
            variant="titleSmall"
            style={{color: 'white', fontWeight: '500'}}>
            {item.total_photos} wallpapers
          </Text>
        </View>
      </View>
    );
  }

  switch (mode) {
    case 'compact':
      if (isLoading) return <SkeletonList />;

      return (
        <View
          style={[{flexDirection: 'row', flexWrap: 'wrap'}, containerStyle]}>
          {data.map((item, index) => (
            <Album key={index} item={item} index={index} />
          ))}
        </View>
      );
    case 'list':
      return (
        <FlatList
          data={data}
          renderItem={Album}
          numColumns={column}
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
        />
      );
  }
}

export default ListAlbums;
