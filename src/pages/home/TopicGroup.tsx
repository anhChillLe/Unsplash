import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {GroupHeading, ListAlbums} from '../../components';
import {ScreenName} from '../../navigations/screen_name';

export default function TopicGroup({width}: {width: number}) {
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
