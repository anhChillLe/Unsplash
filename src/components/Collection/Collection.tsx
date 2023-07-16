import {StyleProp, View, ViewStyle} from 'react-native';
import ImageGrid from '../List/ImageGrid';
import { Text } from 'react-native-paper';
import { BaseGroup } from '../../unsplash/models/base';

type Props = {
  collection: BaseGroup
  style?: StyleProp<ViewStyle>
  space?: number;
  onPress?: () => void
};

export default function CollectionCard({collection, style, space = 2, onPress}: Props) {
  const photos = collection.preview_photos ?? [];

  if(photos.length === 0) return null

  return (
    <View style={style}>
      <ImageGrid photos={photos} style={{flex: 1}} space={space} onPress={onPress}/>
      <Text
          variant="titleMedium"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontWeight: 'bold', marginTop: 4}}>
          {collection.title}
        </Text>
        <Text variant="bodySmall" style={{fontWeight: '500'}}>
          {collection.total_photos} wallpapers
        </Text>
    </View>
  );
}
