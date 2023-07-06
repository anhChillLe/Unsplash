import {Avatar, Chip, Surface, Text} from 'react-native-paper';
import {BackAppBar, ListImageLite} from '../../components';
import {Photo, Topic, User} from '../../services/api/type';
import {Dimensions} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatDate} from '../../ultilities/date_distance';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {clear, getTopicPhotos} from '../../redux/features/topic/detail';
import {AppParamList} from '../../navigations/param_list';

type Props = RouteProp<AppParamList, ScreenName.topicPhotos>;
export default function TopicDetail({route}: {route: Props}) {
  const width = Dimensions.get('window').width;
  const {top} = useSafeAreaInsets();
  const topic = route.params?.topic;
  const navigation = useContext(NavigationContext);

  const state = useSelector((state: RootState) => state.topicPhotos);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getTopicPhotos(topic.id));
    dispatch(getTopicPhotos(topic.id));

    return () => {
      dispatch(clear());
    };
  }, []);

  const onItemPress = (photo: Photo, index: number) => {
    navigation?.navigate(ScreenName.detailPager, {
      position: index,
      type: 'topic',
    });
  };

  const loadMore = () => {
    dispatch(getTopicPhotos(topic.id));
  };

  return (
    <Surface mode="flat" style={{flex: 1, height: '100%', paddingTop: top}}>
      <BackAppBar />
      <ListImageLite
        width={width - 16}
        space={4}
        photos={state.photos}
        header={<ListHeader topic={topic} />}
        onItemPress={onItemPress}
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

const ListHeader = ({topic}: {topic: Topic}) => {
  if (topic === null) return null;
  const navigation = useContext(NavigationContext);

  return (
    <Surface mode="flat" style={{paddingVertical: 4}}>
      <Text
        variant="headlineLarge"
        numberOfLines={1}
        style={{fontWeight: 'bold'}}>
        {topic.title}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topic.owners.map((user: User) => {
          return (
            <Chip
              key={user.id}
              avatar={
                <Avatar.Image
                  size={24}
                  source={{uri: user.profile_image.medium}}
                />
              }
              onPress={() =>
                navigation?.navigate(ScreenName.user, {username: user.username})
              }>
              {user.name}
            </Chip>
          );
        })}
      </ScrollView>

      {topic.description ? (
        <Text variant="bodyMedium" style={{marginVertical: 4}}>
          {topic.description.trim()}
        </Text>
      ) : null}
      <Text style={{fontSize: 12, opacity: 0.6}}>
        {topic.total_photos} photos · {formatDate(topic.published_at)}
      </Text>
    </Surface>
  );
};
