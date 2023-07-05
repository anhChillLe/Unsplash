import {useContext, useRef, useState} from 'react';
import unsplash from '../services/api/unsplash';
import {Photo, Topic} from '../services/api/type';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../navigations/screen_name';

export type TopicDetailViewModel = {
  topic: Topic;
  isLoading: React.MutableRefObject<boolean>;
  photos: Photo[];
  getPhotos: () => void;
  loadMore: () => void;
  onItemPress: (photo: Photo, index: number) => void;
};

export default function getTopicDetailViewModel({topic}: {topic: Topic}) {
  const navigation = useContext(NavigationContext);
  const per_page = 21;
  const page = useRef<number>(0);
  const isLoading = useRef<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const getPhotos = () => {
    if (isLoading.current) return;

    isLoading.current = true;
    unsplash.topics
      .getPhotos({
        topicIdOrSlug: topic.id,
        page: page.current + 1,
        perPage: per_page,
        // orderBy: OrderBy.LATEST,
        // orientation: 'landscape',
      })
      .then(apiResponse => {
        isLoading.current = false;
        return apiResponse.response?.results ?? [];
      })
      .then(data => {
        setPhotos(photos.concat(data));
        page.current += 1;
      })
      .catch(error => {
        isLoading.current = false;
        console.log('getTopicPhotos: ', error);
      });
  };

  const loadMore = getPhotos;

  const onItemPress = (photo: Photo, index: number) => {
    navigation?.navigate(ScreenName.detail, {
      photo,
    });
  };

  const output: TopicDetailViewModel = {
    topic,
    isLoading,
    photos,
    getPhotos,
    loadMore,
    onItemPress,
  };

  return output;
}
