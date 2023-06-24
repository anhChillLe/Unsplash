import { PixelRatio } from 'react-native';
import FastImage from 'react-native-fast-image'

export function getImageUrl(baseUrl: string, width: number, height: number) {
  const imageWidthPixel = PixelRatio.getPixelSizeForLayoutSize(width);
  const imageHeightPixel = PixelRatio.getPixelSizeForLayoutSize(height);
  return baseUrl + `&w=${imageWidthPixel}&h=${imageHeightPixel}`;
}