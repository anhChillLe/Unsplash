import {PropsWithChildren, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Chip} from 'react-native-paper';

type Props = PropsWithChildren<{
  selected: boolean;
  onChange?: (isSelected: boolean) => void;
  style?: StyleProp<ViewStyle>;
}>;

export default function SelectableChip({
  children,
  onChange,
  selected,
  style,
}: Props) {
  const handleOnChange = () => {
    onChange && onChange(!selected);
  };

  return (
    <Chip style={[style]} selected={selected} onPress={handleOnChange}>
      {children}
    </Chip>
  );
}
