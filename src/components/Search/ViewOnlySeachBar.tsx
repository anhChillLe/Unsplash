import React from 'react';
import {Pressable} from 'react-native';
import {Searchbar} from 'react-native-paper';

type Props = {
  placeHolder: string;
  onPress: () => void;
};

export default function ViewOnlySearchBar({placeHolder, onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Searchbar
        mode="bar"
        placeholder={placeHolder}
        editable={false}
        value=""
        onPressIn={onPress}
      />
    </Pressable>
  );
}
