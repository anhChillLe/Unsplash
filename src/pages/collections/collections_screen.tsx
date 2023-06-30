import {Surface, Text} from 'react-native-paper';
import {BackAppBar, ListAlbums} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {Dimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchCollections} from '../../redux/features/collection/collections';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';

export default function CollectionScreen() {
  const state = useSelector((state: RootState) => state.collection);
  const navigation = useContext(NavigationContext);
  const width = Dimensions.get('window').width;
  const {top, bottom} = useSafeAreaInsets();
  const safeAreaWidth = width - 32;

  const dispatch = useDispatch<AppDispatch>();
  const loadMore = () => {
    dispatch(fetchCollections());
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={[]}>
      <Surface
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: 16,
          paddingTop: top,
        }}>
        <BackAppBar />
        <ListAlbums
          data={state.collections}
          column={2}
          space={8}
          mode="list"
          style={{flex: 1}}
          header={
            <Text
              variant="displayMedium"
              style={{fontWeight: 'bold', marginVertical: 16}}>
              Collections
            </Text>
          }
          onEndReached={loadMore}
          onItemPress={collection =>
            navigation?.navigate(ScreenName.CollectionPhotos, {collection})
          }
          contentContainerStyle={{paddingBottom: bottom + 16}}
          isLoading={state.isLoadingCollections}
          width={safeAreaWidth}
        />
      </Surface>
    </SafeAreaView>
  );
}
