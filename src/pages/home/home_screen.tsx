import {Dimensions, ScrollView} from 'react-native';
import {Text, Searchbar, Surface} from 'react-native-paper';
import {GroupHeading, HorizontalImageList, ListAlbums} from '../../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useContext, useEffect} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {fetchTopics} from '../../redux/features/topic/topics';
import {fetchCollections} from '../../redux/features/collection/collections';
import {getPhotosPopular} from '../../redux/features/photo/action';

export default function HomeScreen() {
  const {width} = Dimensions.get('window');
  const {top, bottom, left, right} = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const paddingLeft = left > 0 ? left : 16 + left;
  const paddingRight = right > 0 ? right : 16 + right;
  const paddingTop = top;
  const paddingBottom = bottom + 16;
  const safeAreaWidth = width - paddingLeft - paddingRight;

  useEffect(() => {
    dispatch(getPhotosPopular());
    dispatch(fetchTopics());
    dispatch(fetchCollections());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={[]}>
      <Surface
        style={{
          flex: 1,
          height: '100%',
          paddingTop,
          paddingLeft,
          paddingRight,
        }}>
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
      </Surface>
    </SafeAreaView>
  );
}

function CollectionGroup({width}: {width: number}) {
  const collectionsState = useSelector((state: RootState) => state.collection);
  const navigation = useContext(NavigationContext);

  return (
    <>
      <GroupHeading
        containerStyle={{marginTop: 32}}
        onMorePress={() => navigation?.navigate(ScreenName.collections)}>
        Hot collections
      </GroupHeading>
      <ListAlbums
        data={collectionsState.collections}
        column={2}
        space={8}
        maxItems={4}
        itemRatio={2}
        isLoading={collectionsState.isLoadingCollections}
        mode="compact"
        width={width}
        onItemPress={item => {
          navigation?.navigate(ScreenName.CollectionPhotos, {collection: item});
          // console.log(item)
        }}
        style={{
          marginTop: 12,
        }}
      />
    </>
  );
}

function TopicGroup({width}: {width: number}) {
  const topicsState = useSelector((state: RootState) => state.topic);
  const navigation = useContext(NavigationContext);

  return (
    <>
      <GroupHeading
        containerStyle={{marginTop: 32}}
        onMorePress={() => navigation?.navigate(ScreenName.topics)}>
        Hot topics
      </GroupHeading>
      <ListAlbums
        data={topicsState.topics}
        column={2}
        space={8}
        maxItems={4}
        isLoading={topicsState.isLoadingTopics}
        onItemPress={topic => navigation?.navigate(ScreenName.TopicPhotos, {topic})}
        mode="compact"
        width={width}
        style={{
          marginTop: 12,
        }}
      />
    </>
  );
}

function PhotoGroup() {
  const navigation = useContext(NavigationContext);
  const photosState = useSelector((state: RootState) => state.photoPopular);
  return (
    <>
      <GroupHeading
        containerStyle={{marginTop: 32}}
        onMorePress={() => navigation?.navigate(ScreenName.allImage)}>
        Top of the week
      </GroupHeading>
      <HorizontalImageList
        data={photosState.photos}
        itemWidth={135}
        itemHeight={240}
        space={16}
        maxItem={6}
        isLoading={photosState.isLoading}
        containerStyle={{
          marginTop: 12,
        }}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
      />
    </>
  );
}
