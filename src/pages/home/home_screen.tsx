import {Dimensions, ScrollView, View} from 'react-native';
import {Text, Searchbar} from 'react-native-paper';
import {GroupHeading, HorizontalImageList, ListAlbums} from '../../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useContext, useEffect} from 'react';
import {photos, topics, collections} from '../../services/sampleData';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {fetchPhotos} from '../../redux/features/photos';
import {fetchTopics} from '../../redux/features/topics';
import {fetchCollections} from '../../redux/features/collections';

export default function HomeScreen() {
  const {width} = Dimensions.get('window');
  const {top, bottom, left, right} = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const paddingLeft = left > 0 ? left : 16 + left;
  const paddingRight = right > 0 ? right : 16 + right;
  const paddingTop = top;
  const paddingBottom = bottom;
  const safeAreaWidth = width - paddingLeft - paddingRight;

  useEffect(() => {
    dispatch(fetchPhotos());
    dispatch(fetchTopics());
    dispatch(fetchCollections());
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, paddingTop, paddingLeft, paddingRight}}
      edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom,
        }}>
        <Text
          variant="displayLarge"
          style={{fontWeight: '500', marginVertical: 16}}>
          Home
        </Text>
        <Searchbar
          mode="bar"
          placeholder="Search for image"
          focusable={false}
          value={''}
        />

        <PhotoGroup />
        <TopicGroup width={safeAreaWidth} />
        <CollectionGroup width={safeAreaWidth} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CollectionGroup({width}: {width: number}) {
  const collectionsState = useSelector((state: RootState) => state.collection);

  return (
    <>
      <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
        Hot collections
      </GroupHeading>
      <ListAlbums
        data={collectionsState.collections}
        // data={collections}
        column={2}
        space={8}
        maxItems={4}
        itemRatio={2}
        isLoading={collectionsState.isLoadingCollections}
        mode="compact"
        width={width}
        containerStyle={{
          marginTop: 12,
        }}
      />
    </>
  );
}

function TopicGroup({width}: {width: number}) {
  const topicsState = useSelector((state: RootState) => state.topic);

  return (
    <>
      <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
        Hot topics
      </GroupHeading>
      <ListAlbums
        data={topicsState.topics}
        // data={topics}
        column={2}
        space={8}
        // maxItems={4}
        isLoading={topicsState.isLoadingTopics}
        mode="compact"
        width={width}
        containerStyle={{
          marginTop: 12,
        }}
      />
    </>
  );
}

function PhotoGroup() {
  const navigation = useContext(NavigationContext);
  const photosState = useSelector((state: RootState) => state.photo);
  return (
    <>
      <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
        Top of the week
      </GroupHeading>
      <HorizontalImageList
        data={photosState.photos}
        itemWidth={135}
        itemHeight={240}
        space={16}
        isLoading={photosState.isLoadingPhotos}
        containerStyle={{
          marginTop: 12,
        }}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
      />
    </>
  );
}
