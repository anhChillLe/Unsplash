import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Collection, Topic} from '../../services/api/type';
import ImageCard from '../ImageCard/ImageCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  data: Topic[] | Collection[];
  column: number;
  space: number;
  width: number;
  showLoadingFooter?: boolean;
  header?: React.ReactElement;
  onItemPress?: (item: Topic | Collection) => void;
  isLoading?: boolean;
  mode?: 'compact' | 'list';
  itemRatio?: number;
  maxItems?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onEndReached?: () => void;
};

function ListAlbums({
  data,
  column,
  space,
  width,
  isLoading = false,
  mode = 'compact',
  itemRatio = 3 / 2,
  showLoadingFooter = false,
  maxItems,
  header,
  onEndReached,
  onItemPress,
  contentContainerStyle,
  style,
}: Props) {
  const itemWidth = (width - (column - 1) * space) / column;

  const getItemMarginEnd = (index: number) => {
    if ((index + 1) % column == 0) return 0;
    else return space;
  };

  const getItemMarginBottom = (index: number) => {
    if (index < data.length - column) return space;
    else return 0;
  };

  if (maxItems && data.length > maxItems) {
    data = data.slice(0, maxItems);
  }
  function SkeletonList() {
    return (
      <SkeletonPlaceholder borderRadius={8}>
        <SkeletonPlaceholder.Item
          style={[{flexDirection: 'row', flexWrap: 'wrap'}, style]}>
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

  function Album({item, index}: {item: Topic | Collection; index: number}) {
    const marginEnd = getItemMarginEnd(index);
    const marginBottom = getItemMarginBottom(index);

    if (!item.cover_photo) return null;

    return (
      <View style={{marginEnd, marginBottom, width: itemWidth}}>
        <ImageCard
          photo={item.cover_photo}
          width={itemWidth}
          height={itemWidth / itemRatio}
          placeHolderMode="skeleton"
          onPress={onItemPress ? () => onItemPress(item) : undefined}
        />
        <Text
          variant="titleMedium"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontWeight: 'bold'}}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={{fontWeight: '500'}}>
          {item.total_photos} wallpapers
        </Text>
      </View>
    );
  }

  switch (mode) {
    case 'compact':
      if (isLoading) return <SkeletonList />;
      return (
        <View style={[{flexDirection: 'row', flexWrap: 'wrap'}, style]}>
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
          onEndReached={onEndReached}
          style={style}
          ListHeaderComponent={header}
          ListFooterComponent={
            showLoadingFooter ? (
              <ActivityIndicator size="small" style={{margin: 8}} />
            ) : null
          }
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: Topic | Collection, index: number) => item.id}
        />
      );
  }
}

export default ListAlbums;
