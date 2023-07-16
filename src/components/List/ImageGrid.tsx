import {
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, useTheme} from 'react-native-paper';
import {VeryBasic} from 'unsplash-js/dist/methods/photos/types';

type Props = {
  photos: VeryBasic[];
  total?: number;
  style?: StyleProp<ViewStyle>;
  space?: number;
  onPress?: () => void;
};

export default function ImageGrid({
  photos,
  total,
  style,
  space = 0,
  onPress,
}: Props) {
  const colors = useTheme().colors;

  if (photos.length === 1) {
    return (
      <FastImage
        source={{uri: photos[0].urls.regular}}
        style={{height: '100%', flex: 1, margin: space, borderRadius: 4}}
      />
    );
  }

  if (photos.length === 2) {
    return (
      <View style={{flexDirection: 'row', flex: 1, marginVertical: -space}}>
        <FastImage
          source={{uri: photos[0].urls.regular}}
          style={{flex: 1, margin: space, borderRadius: 4}}
        />
        <Pressable style={{flex: 1, margin: space}} onPress={onPress}>
          <FastImage
            source={{uri: photos[1].urls.regular}}
            style={{flex: 1, borderRadius: 4}}
          />
          {onPress && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.75,
                backgroundColor: colors.secondary,
                borderRadius: 4,
              }}>
              <Text
                variant="headlineSmall"
                style={{fontWeight: 'bold', color: colors.onSecondary}}>
                {total ? `+${total - 3}` : 'All photos'}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        {flexDirection: 'row', margin: -space, alignItems: 'center'},
        style,
      ]}>
      <FastImage
        source={{uri: photos[0].urls.regular}}
        style={{height: '100%', flex: 1, margin: space, borderRadius: 4, backgroundColor: 'gray'}}
      />
      <View style={{flexDirection: 'column', flex: 1, marginVertical: -space}}>
        <FastImage
          source={{uri: photos[1].urls.regular}}
          style={{flex: 1, margin: space, borderRadius: 4, backgroundColor: 'gray'}}
        />
        <Pressable style={{flex: 1, margin: space}} onPress={onPress}>
          <FastImage
            source={{uri: photos[2].urls.regular}}
            style={{flex: 1, borderRadius: 4, backgroundColor: 'gray'}}
          />

          {onPress && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
                backgroundColor: colors.secondary,
                borderRadius: 4,
              }}>
              <Text
                variant="headlineSmall"
                style={{fontWeight: 'bold', color: colors.onSecondary}}>
                {total ? `+${total - 3}` : 'All photos'}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
