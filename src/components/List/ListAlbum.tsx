import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Card, Text} from 'react-native-paper';

type Props = {
  data: any[];
  column: number;
  space: number;
  width: number;
  mode?: 'compact' | 'list';
  itemRatio?: number,
  maxItems?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

function ListAlbums({
  data,
  column,
  space,
  width,
  mode = 'compact',
  itemRatio = 3/2,
  maxItems,
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

  function Album({item, index}: {item: any; index: number}) {
    const marginEnd = getItemMarginEnd(index);
    const marginBottom = getItemMarginBottom(index);

    return (
      <Card style={{marginEnd, marginBottom}}>
        <Card.Cover
          source={{uri: item.cover_photo.urls.thumb}}
          style={{
            width: itemWidth,
            height: itemWidth / itemRatio, 
          }}
        />
        <View style={{position: 'absolute', bottom: 0, left: 0, paddingLeft: 12, paddingBottom: 12}}>
          <Text
            variant="titleLarge"
            style={{color: 'white', fontWeight: '500'}}>
            {item.title}
          </Text>
          <Text
            variant="titleSmall"
            style={{color: 'white', fontWeight: '500'}}>
            {item.total_photos} wallpapers
          </Text>
        </View>
      </Card>
    );
  }

  if (maxItems && data.length > maxItems) {
    data = data.slice(0, maxItems);
  }

  switch (mode) {
    case 'compact':
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
      )
  }
}

export default ListAlbums;
