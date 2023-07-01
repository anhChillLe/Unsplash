import {Surface} from 'react-native-paper';
import {ListImageLite} from '../../components';
import {Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/root_navigation';
import {ScreenName} from '../../navigations/screen_name';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {searchImage} from '../../redux/features/search/actions';
import {useEffect} from 'react';

type Props = RouteProp<RootStackParamList, ScreenName.SearchResult>;
export default function SearchResultScreen({route}: {route: Props}) {
  const {width} = Dimensions.get('window');
  const input = route.params;
  const state = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // console.log(input)
    dispatch(searchImage(input.searchInput));
  }, []);

  return (
    <Surface
      mode="flat"
      style={{flex: 1, height: '100%', paddingHorizontal: 4}}>
      <ListImageLite
        width={width - 8}
        space={4}
        photos={state.result}
        column={2}
      />
    </Surface>
  );
}
