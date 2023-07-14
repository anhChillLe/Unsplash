import {Surface, Text} from 'react-native-paper';
import {BackAppBar, ListAlbums} from '../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Dimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';

export default function TopicScreen() {
  const state = useSelector((state: RootState) => state.topic);
  const width = Dimensions.get('window').width;
  const {top, bottom} = useSafeAreaInsets();
  const safeAreaWidth = width - 32;
  const navigation = useContext(NavigationContext);

  return (
    <SafeAreaView style={{flex: 1}} edges={[]}>
      <Surface
        style={{
          flex: 1,
          height: '100%',
          paddingTop: top,
        }}>
        <BackAppBar />
        <ListAlbums
          data={state.topics}
          column={1}
          space={8}
          mode="list"
          itemMode='group'
          header={
            <Text
              variant="displayLarge"
              style={{fontWeight: '500', marginVertical: 16}}>
              Topics
            </Text>
          }
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: bottom + 16, paddingHorizontal: 16}}
          isLoading={state.isLoadingTopics}
          width={safeAreaWidth}
          onItemPress={topic =>
            navigation?.navigate(ScreenName.topicPhotos, {topic})
          }
        />
      </Surface>
    </SafeAreaView>
  );
}
