import {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

type Props = PropsWithChildren<{
  mode?: 'flat' | 'outlined';
  icon?: IconSource
  onPress?: () => void
}>;

export default function SingleTag({children, mode = 'outlined', icon, onPress = () => {}}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 12,
      }}>
      <Chip mode={mode} icon={icon} onPress={onPress}>
        {children}
      </Chip>
    </View>
  );
}
