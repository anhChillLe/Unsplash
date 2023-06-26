import {NavigationContext, RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar, Surface} from 'react-native-paper';
import {RootStackParamList} from '../../navigations/root_navigation';
import {ScreenName} from '../../navigations/screen_name';
import {useContext} from 'react';
import {ImageCard, UserElement} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../constants/colors';

type Props = RouteProp<RootStackParamList, ScreenName.detail>;
export default function DetailScreen({route}: {route: Props}) {
  const photo = route.params.photo;
  const navigation = useContext(NavigationContext);
  const {top} = useSafeAreaInsets();

  return (
    <Surface style={{flex: 1, height: '100%', paddingTop: top}}>
      <Appbar
        elevated={false}
        mode="small"
        style={{backgroundColor: Colors.transparent}}>
        <Appbar.BackAction onPress={navigation?.goBack} />
      </Appbar>
      <ScrollView style={{flex: 1}}>
        <UserElement
          user={photo.user}
          avatarSize={48}
          quality="large"
          style={{
            padding: 8,
          }}
        />
        <ImageCard
          roundness={0}
          mode="contained"
          photo={photo}
          placeHolderMode='blurhash'
          width="full"
          height="auto"
          quality="auto"
        />
      </ScrollView>
    </Surface>
  );
}
