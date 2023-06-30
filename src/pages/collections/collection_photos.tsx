import {Avatar, Chip, Surface, Text} from 'react-native-paper';
import {BackAppBar, ListImageLite} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {Collection, Tag} from '../../services/api/type';
import {Dimensions, View} from 'react-native';
import {RootStackParamList} from '../../navigations/root_navigation';
import {ScreenName} from '../../navigations/screen_name';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {
  clear,
  getCollectionPhotos,
  getCollectionDetail,
} from '../../redux/features/collection/photos';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatDate} from '../../ultilities/date_distance';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = RouteProp<RootStackParamList, ScreenName.CollectionPhotos>;
export default function CollectionPhoto({route}: {route: Props}) {
  const dispatch = useDispatch<AppDispatch>();
  const width = Dimensions.get('window').width;
  const {top, bottom} = useSafeAreaInsets();
  const navigation = useContext(NavigationContext);
  const collection = route.params?.collection;

  const state = useSelector((state: RootState) => state.collectionPhotos);

  useEffect(() => {
    dispatch(clear({id: collection.id}));
    dispatch(getCollectionPhotos(collection.id));
    dispatch(getCollectionDetail(collection.id));
  }, []);

  return (
    <Surface mode="flat" style={{flex: 1, height: '100%', paddingTop: top}}>
      <BackAppBar />
      <ListImageLite
        width={width - 16}
        space={4}
        photos={state.photos}
        header={<ListHeader />}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
        column={3}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </Surface>
  );
}

const ListHeader = () => {
  const state = useSelector((state: RootState) => state.collectionPhotos);
  const collection = state.detail;

  if (collection === null) return null;

  return (
    <Surface mode="flat" style={{paddingVertical: 4}}>
      <Text
        variant="headlineLarge"
        numberOfLines={1}
        style={{fontWeight: 'bold'}}>
        {collection.title}
      </Text>

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <Avatar.Image
          size={24}
          source={{uri: collection.user.profile_image.small}}
        />
        <Text variant="bodySmall" style={{marginStart: 8, fontWeight: 'bold'}}>
          {collection.user.name}
        </Text>
      </View>

      {collection.description ? (
        <Text variant="bodyMedium" style={{marginVertical: 4}}>
          {collection.description}
        </Text>
      ) : null}
      <Text style={{fontSize: 12, opacity: 0.6}}>
        {collection.total_photos} photos · {formatDate(collection.published_at)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 8,
          marginHorizontal: -4,
        }}>
        {collection.tags.map((tag: Tag, index: number) => {
          return (
            <Chip key={tag.title} style={{margin: 4}}>
              {tag.title}
            </Chip>
          );
        })}
      </View>
    </Surface>
  );
};
