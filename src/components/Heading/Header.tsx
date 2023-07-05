import {PropsWithChildren} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Button, MD3TypescaleKey, Text} from 'react-native-paper';

type VariantType = keyof typeof MD3TypescaleKey;
type Props = PropsWithChildren<{
  variant?: VariantType;
  onMorePress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}>;

export default function GroupHeading({
  children,
  onMorePress,
  containerStyle,
  textStyle,
  variant = 'headlineSmall',
}: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <Text variant={variant} style={[{fontWeight: 'bold'}, textStyle]}>
        {children}
      </Text>
      {onMorePress ? (
        <Button compact mode="text" onPress={onMorePress}>
          See more
        </Button>
      ) : null}
    </View>
  );
}
