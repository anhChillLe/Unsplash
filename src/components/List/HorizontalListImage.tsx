import {ScrollView} from 'react-native';
import {Card} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

export default function HorizontalImageList({
  data,
  itemWidth,
  itemHeight,
  space,
  cardStyle,
  containerStyle,
}: {
  data: any[];
  itemWidth: number;
  itemHeight: number;
  space: number;
  cardStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={containerStyle}>
      {data.map((item, index) => (
        <Card
          key={index.toString()}
          style={[{marginRight: space, width: itemWidth, height: itemHeight}, cardStyle]}>
          <Card.Cover
            style={{width: itemWidth, height: itemHeight}}
            source={{uri: item.urls.thumb}}
          />
        </Card>
      ))}
    </ScrollView>
  );
}
