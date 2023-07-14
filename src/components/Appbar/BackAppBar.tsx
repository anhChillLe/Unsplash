import {NavigationContext} from '@react-navigation/native';
import {useContext} from 'react';
import {Appbar} from 'react-native-paper';

export default function BackAppBar() {
  const navigation = useContext(NavigationContext);

  return (
    <Appbar
      elevated={false}
      mode="small"
      safeAreaInsets={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      style={{backgroundColor: 'transparent', height: 48}}>
      <Appbar.BackAction onPress={navigation?.goBack} />
    </Appbar>
  );
}
