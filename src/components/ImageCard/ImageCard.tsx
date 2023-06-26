import {useState} from 'react';
import {Dimensions, PixelRatio, StyleProp, View, ViewStyle} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Photo} from '../../services/api/type';
import {Blurhash} from 'react-native-blurhash';
import FastImage from 'react-native-fast-image';

export function getImageUrl(baseUrl: string, width: number, height: number) {
  const imageWidthPixel = PixelRatio.getPixelSizeForLayoutSize(width);
  const imageHeightPixel = PixelRatio.getPixelSizeForLayoutSize(height);
  return baseUrl + `&w=${imageWidthPixel}&h=${imageHeightPixel}`;
}

interface Props {
  photo: Photo;
  width: number | 'full';
  height: number | 'auto';
  roundness?: number;
  onPress?: (photo: Photo) => void;
  mode?: 'elevated' | 'contained' | 'outlined';
  style?: StyleProp<ViewStyle>;
  quality?: 'thumb' | 'full' | 'raw' | 'regular' | 'small' | 'auto';
  placeHolderMode?: 'color' | 'skeleton' | 'blurhash' | 'none';
}

export default function ImageCard({
  photo,
  width,
  height,
  onPress = photo => {},
  roundness,
  style,
  mode = 'outlined',
  placeHolderMode = 'none',
  quality = 'auto',
}: Props) {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const endLoading = () => setLoading(false);

  const theme = useTheme();
  if (width === 'full') width = Dimensions.get('window').width;
  if (height === 'auto') height = (width * photo.width) / photo.height;
  if (roundness === undefined) roundness = theme.roundness;

  return (
    <Card
      style={[style, {overflow: 'hidden'}]}
      mode={mode}
      theme={{roundness}}
      onPress={() => onPress(photo)}>
      <FastImage
        onLoadStart={startLoading}
        onLoadEnd={endLoading}
        style={[
          {width, height},
          placeHolderMode === 'color' && photo.color != null
            ? {backgroundColor: photo.color}
            : null,
        ]}
        source={{
          uri:
            quality === 'auto'
              ? getImageUrl(photo.urls.raw, width, height)
              : photo.urls[quality],
        }}
      />
      {placeHolderMode === 'skeleton' && isLoading ? (
        <View style={{position: 'absolute'}}>
          <SkeletonPlaceholder enabled={isLoading} borderRadius={roundness}>
            <SkeletonPlaceholder.Item width={width} height={height} />
          </SkeletonPlaceholder>
        </View>
      ) : null}

      {placeHolderMode === 'blurhash' &&
      photo.blur_hash != null &&
      isLoading ? (
        <Blurhash
          blurhash={photo.blur_hash}
          style={{width, height, position: 'absolute', overflow: 'hidden'}}
        />
      ) : null}
    </Card>
  );
}
