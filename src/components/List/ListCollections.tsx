import { StyleProp, View, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  data: any[];
  column: number;
  space: number;
  width: number;
  containerStyle?: StyleProp<ViewStyle>;
};

function ListCollections({data, column, space, width, containerStyle} : Props){
  const itemWidth = width / column - space / 2;
  function Collection({item, index}: {item: any, index: number}){
    return (
      <Card
        style={{marginEnd: index % 2 == 0 ? space : 0, marginBottom: space}}>
        <Card.Cover
          source={{uri: item.cover_photo.urls.thumb}}
          style={{
            width: itemWidth,
            height: (itemWidth * 2) / 3,
          }}
        />
        <View style={{position: 'absolute', bottom: 0, left: 0, padding: 12}}>
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

  data = data.slice(0, 4);

  return (
    <View style={[{flexDirection: 'row', flexWrap: 'wrap'}, containerStyle]}>
      {data.map((item, index) => (
        <Collection key={index} item={item} index={index} />
      ))}
    </View>
  );
}