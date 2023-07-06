import {Dimensions, Pressable, ScrollView, Touchable, View} from 'react-native';
import {Text, Searchbar, Surface, IconButton, Avatar} from 'react-native-paper';
import {
  GroupHeading,
  HomeMenu,
  HorizontalImageList,
  ListAlbums,
  UserElement,
} from '../../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useContext, useEffect} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {fetchTopics} from '../../redux/features/topic/topics';
import {fetchCollections} from '../../redux/features/collection/collections';
import {getPhotosPopular} from '../../redux/features/photo/action';
import {getCurrentUser} from '../../redux/features/user/action';
import {ClearToken} from '../../ultilities/keychain_ulti';
import {clear} from '../../redux/features/auth/auth';

export default function HomeScreen() {
  const navigation = useContext(NavigationContext);
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
    dispatch(getCurrentUser());
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
          <UserGroup />
          <Pressable onPress={() => navigation?.navigate(ScreenName.search)}>
            <Searchbar
              mode="bar"
              placeholder="Search for image"
              editable={false}
              value=""
              onPressIn={() => navigation?.navigate(ScreenName.search)}
            />
          </Pressable>

          <PhotoGroup />
          <TopicGroup width={safeAreaWidth} />
          <CollectionGroup width={safeAreaWidth} />
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
}

function UserGroup() {
  const user = useSelector((state: RootState) => state.user.profile);

  const dispatch = useDispatch<AppDispatch>();

  if (!user) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 16,
          alignItems: 'center',
        }}>
        <Text variant="displaySmall" style={{fontWeight: 'bold', flex: 1}}>
          Hi chill!
        </Text>
        <IconButton icon="cog" size={28} />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 16,
        alignItems: 'center',
      }}>
      <Text variant="headlineMedium" style={{fontWeight: 'bold', flex: 1}}>
        Hi {user.last_name}!
      </Text>

      <Pressable
        onPress={() => {
          ClearToken();
          dispatch(clear());
        }}></Pressable>

      <HomeMenu>
        <Avatar.Image size={32} source={{uri: user.profile_image.medium}} />
      </HomeMenu>
    </View>
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
          navigation?.navigate(ScreenName.collectionPhotos, {collection: item});
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
        onItemPress={topic =>
          navigation?.navigate(ScreenName.topicPhotos, {topic})
        }
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
