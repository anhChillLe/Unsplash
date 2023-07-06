import {NavigationContext, RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar, Surface} from 'react-native-paper';
import {ScreenName} from '../../navigations/screen_name';
import {useContext} from 'react';
import {BackAppBar, ImageCard, UserElement} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../constants/colors';
import { AppParamList } from '../../navigations/param_list';
import PageContainer from './image_page';

type Props = RouteProp<AppParamList, ScreenName.detail>;
export default function DetailScreen({route}: {route: Props}) {
  const photo = route.params.photo;
  const navigation = useContext(NavigationContext);
  const {top} = useSafeAreaInsets();

  return (
    <Surface style={{flex: 1, height: '100%', paddingTop: top}}>
      <BackAppBar />
      <PageContainer photo={photo}/>
    </Surface>
  );
}
