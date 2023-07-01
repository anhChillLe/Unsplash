import PagerView from 'react-native-pager-view';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {Surface, Text} from 'react-native-paper';
import {BackAppBar, ImageCard, UserElement} from '../../components';
import {Photo} from '../../services/api/type';
import {ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/root_navigation';
import {ScreenName} from '../../navigations/screen_name';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getPhotos,
  getPhotosLatest,
  getPhotosOldest,
  getPhotosPopular,
} from '../../redux/features/photo/action';
import {getTopicPhotos} from '../../redux/features/topic/detail';
import {getCollectionPhotos} from '../../redux/features/collection/photos';

type Props = RouteProp<RootStackParamList, ScreenName.detailPager>;
export default function DetailViewPager({route}: {route: Props}) {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const initalPage = route.params.position;
  const state = useSelector((state: RootState) => {
    switch (route.params.type) {
      case 'latest':
        return state.photoLatest;
      case 'oldest':
        return state.photoOldest;
      case 'popular':
        return state.photoPopular;
      case 'topic':
        return state.topicPhoto;
      case 'collection':
        return state.collectionPhotos;
    }
  });

  const loadMore = () => {
    switch (route.params.type) {
      case 'latest':
        dispatch(getPhotosLatest());
        break;
      case 'oldest':
        dispatch(getPhotosOldest());
        break;
      case 'popular':
        dispatch(getPhotosPopular());
        break;
      case 'topic':
        dispatch(getTopicPhotos('nextPage'));
        break;
      case 'collection':
        dispatch(getCollectionPhotos('nextPage'));
        break;
    }
  };

  const onPageChange = (index: number) => {
    if (index > state.photos.length - 4) {
      loadMore();
    }
  };

  return (
    <Surface
      mode="flat"
      style={{flex: 1, height: '100%', paddingTop: top, paddingBottom: bottom}}>
      <BackAppBar />
      <PagerView
        style={{flex: 1}}
        offscreenPageLimit={1}
        initialPage={initalPage}
        onPageSelected={position => {
          onPageChange(position.nativeEvent.position);
        }}>
        {state.photos.map((photo: Photo) => (
          <Page key={photo.id} photo={photo} />
        ))}
      </PagerView>
    </Surface>
  );
}

function Page({photo}: {photo: Photo}) {
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <UserElement
        user={photo.user}
        avatarSize={48}
        quality="large"
        style={{
          padding: 8,
        }}
      />
      {photo.description ? (
        <Text style={{padding: 8}}>{photo.description}</Text>
      ) : null}

      <ImageCard
        roundness={0}
        mode="contained"
        photo={photo}
        placeHolderMode="blurhash"
        width="full"
        height="auto"
        quality="auto"
      />
    </ScrollView>
  );
}
