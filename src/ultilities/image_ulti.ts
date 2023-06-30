import { PixelRatio } from "react-native";

export function getImageUrl(baseUrl: string, width: number, height: number) {
  const imageWidthPixel = PixelRatio.getPixelSizeForLayoutSize(width);
  const imageHeightPixel = PixelRatio.getPixelSizeForLayoutSize(height);
  return baseUrl + `&w=${imageWidthPixel}&h=${imageHeightPixel}&fit=max&q=100&fm=jpg`;
}