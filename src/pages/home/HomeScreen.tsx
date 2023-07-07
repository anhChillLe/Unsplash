import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Text, Searchbar, Surface, IconButton, Avatar} from 'react-native-paper';
import {GroupHeading, HorizontalImageList, ListAlbums} from '../../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import React, {useContext, useEffect} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {fetchTopics} from '../../redux/features/topic/topics';
import {fetchCollections} from '../../redux/features/collection/collections';
import {getPhotosPopular} from '../../redux/features/photo/action';
import {getCurrentUser} from '../../redux/features/user/action';
import {container} from '../../assets/style';
import PhotoGroup from './PhotoGroup';
import UserGroup from './UserGroup';
import TopicGroup from './TopicGroup';
import CollectionGroup from './CollectionGroup';

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
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1}} edges={[]}>
      <Surface
        style={[
          container.page,
          {
            paddingTop,
            paddingLeft,
            paddingRight,
          },
        ]}>
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
