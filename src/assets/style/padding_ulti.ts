import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface AppPadding {
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
}

export function getAppPadding(): AppPadding {
  const {top, bottom, left, right} = useSafeAreaInsets();
  const paddingLeft = left > 0 ? left : 16 + left;
  const paddingRight = right > 0 ? right : 16 + right;
  const paddingTop = top;
  const paddingBottom = bottom + 16;

  return {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  };
}
