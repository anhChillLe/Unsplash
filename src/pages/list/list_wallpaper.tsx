import {Dimensions} from 'react-native';
import {ListImageLite} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useContext, useEffect} from 'react';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {Surface} from 'react-native-paper';
import {getPhotos} from '../../redux/features/photo/action';
import {PhotosParamList} from '../../navigations/list_top_navigation';
import {OrderBy} from 'unsplash-js';

type Props = RouteProp<
  PhotosParamList,
  | ScreenName.ListImageLatest
  | ScreenName.ListImageOldest
  | ScreenName.ListImagePopular
>;
export default function AllImageScreen({route}: {route: Props}) {
  const navigation = useContext(NavigationContext);
  const width = Dimensions.get('window').width;
  const order = route.params.order;
  const state = useSelector((state: RootState) => {
    switch (order) {
      case OrderBy.LATEST:
        return state.photoLatest;
      case OrderBy.POPULAR:
        return state.photoPopular;
      case OrderBy.OLDEST:
        return state.photoOldest;
      default:
        return state.photoLatest;
    }
  });

  const dispatch = useDispatch<AppDispatch>();
  const loadMore = () => {
    dispatch(getPhotos(order)());
  };

  useEffect(() => {
    dispatch(getPhotos(order)());
  }, []);

  return (
    <Surface
      style={{
        flex: 1,
        height: '100%',
        paddingHorizontal: 4,
      }}>
      <ListImageLite
        width={width - 8}
        space={4}
        photos={state.photos}
        column={3}
        style={{flex: 1}}
        onEndReached={loadMore}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
      />
    </Surface>
  );
}
