import {Avatar, Chip, Surface, Text} from 'react-native-paper';
import {BackAppBar, ListImageLite} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {Tag} from '../../services/api/type';
import {Dimensions, View} from 'react-native';
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
import {SearchInput} from '../../redux/features/search/actions';
import { AppParamList } from '../../navigations/param_list';

type Props = RouteProp<AppParamList, ScreenName.collectionPhotos>;
export default function CollectionPhoto({route}: {route: Props}) {
  const width = Dimensions.get('window').width;
  const {top, bottom} = useSafeAreaInsets();
  const navigation = useContext(NavigationContext);
  const collection = route.params?.collection;

  const photos = useSelector((state: RootState) => state.collectionPhotos.photos);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCollectionPhotos(collection.id));
    dispatch(getCollectionDetail(collection.id));

    return () => {
      dispatch(clear());
    };
  }, []);

  const loadMore = () => {
    dispatch(getCollectionPhotos(collection.id));
  };

  return (
    <Surface mode="flat" style={{flex: 1, height: '100%', paddingTop: top}}>
      <BackAppBar />
      <ListImageLite
        width={width - 16}
        space={4}
        photos={photos}
        header={<ListHeader />}
        onItemPress={(photo, index) =>
          navigation?.navigate(ScreenName.detailPager, {
            position: index,
            type: 'collection',
          })
        }
        column={3}
        itemThreshold={6}
        onEndReached={loadMore}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </Surface>
  );
}

const ListHeader = () => {
  const state = useSelector((state: RootState) => state.collectionPhotos);
  const navigation = useContext(NavigationContext);
  const collection = state.detail;

  if (collection === null) return null;

  return (
    <Surface
      mode="flat"
      style={{
        paddingVertical: 4,
      }}>
      <Text
        variant="headlineLarge"
        numberOfLines={1}
        style={{fontWeight: 'bold'}}>
        {collection.title}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Chip
          avatar={
            <Avatar.Image
              size={24}
              source={{uri: collection.user.profile_image.medium}}
            />
          }
          onPress={() => navigation?.navigate(ScreenName.user, {username: collection.user.username})}>
          {collection.user.name}
        </Chip>
      </View>

      {collection.description ? (
        <Text variant="bodyMedium" style={{marginVertical: 4}}>
          {collection.description}
        </Text>
      ) : null}
      <Text style={{fontSize: 12, opacity: 0.6, marginVertical: 2}}>
        {collection.total_photos} photos · {formatDate(collection.published_at)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 8,
          marginHorizontal: -4,
        }}>
        {collection.tags.map((tag: Tag, index: number) => (
          <Chip
            key={tag.title}
            style={{margin: 4}}
            onPress={() => {
              const input: SearchInput = {
                query: tag.title,
              };
              navigation?.navigate(ScreenName.searchResult, {
                searchInput: input,
              });
            }}>
            {tag.title}
          </Chip>
        ))}
      </View>
    </Surface>
  );
};
