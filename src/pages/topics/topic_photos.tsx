import {Avatar, Chip, Surface, Text} from 'react-native-paper';
import {BackAppBar, ListImageLite} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {Topic, User} from '../../services/api/type';
import {Dimensions} from 'react-native';
import {RootStackParamList} from '../../navigations/root_navigation';
import {ScreenName} from '../../navigations/screen_name';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatDate} from '../../ultilities/date_distance';
import {clear, getTopicPhotos} from '../../redux/features/topic/detail';
import {ScrollView} from 'react-native-gesture-handler';

type Props = RouteProp<RootStackParamList, ScreenName.TopicPhotos>;
export default function TopicPhotos({route}: {route: Props}) {
  const dispatch = useDispatch<AppDispatch>();
  const width = Dimensions.get('window').width;
  const {top} = useSafeAreaInsets();
  const navigation = useContext(NavigationContext);
  const topic = route.params?.topic;
  if (!topic) return null;

  const state = useSelector((state: RootState) => state.topicPhoto);

  const loadMore = () => {
    dispatch(getTopicPhotos(topic.id))
  }

  useEffect(() => {
    dispatch(clear({id: topic.id}));
    dispatch(getTopicPhotos(topic.id));
  }, []);

  return (
    <Surface mode="flat" style={{flex: 1, height: '100%', paddingTop: top}}>
      <BackAppBar />
      <ListImageLite
        width={width - 16}
        space={4}
        photos={state.photos}
        header={<ListHeader topic={topic} />}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
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
