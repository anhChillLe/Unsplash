import {MutableRefObject, useContext, useRef, useState} from 'react';
import unsplash from '../services/api/unsplash';
import {
  Collection,
  CollectionWithTags,
  Photo,
} from '../services/api/type';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../navigations/screen_name';

export interface CollectionDetailViewModel {
  detail: CollectionWithTags;
  isLoading: React.MutableRefObject<boolean>;
  photos: Photo[];
  getPhotos: () => void;
  getDetail: () => void;
  loadMore: () => void;
  onItemPress: (photo: Photo, index: number) => void;
}

export default function getCollectionDetailViewModel(collection: Collection) {
  const navigation = useContext(NavigationContext);
  const per_page = 21;
  const page = useRef<number>(0);
  const isLoading = useRef<boolean>(false);
  const [detail, setDetail] = useState<CollectionWithTags>({
    ...collection,
    tags: [],
  });
  const [photos, setPhotos] = useState<Photo[]>([]);

  const getPhotos = () => {
    if (isLoading.current) return;

    isLoading.current = true;
    unsplash.collections
      .getPhotos({
        collectionId: collection.id,
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
        console.log('getCollection: ', error);
      });
  };

  const getDetail = () => {
    unsplash.collections
      .get({collectionId: collection.id})
      .then(apiResponse => apiResponse.response as CollectionWithTags)
      .then(detail => setDetail(detail))
      .catch(error => console.log('getCollectionDetail: ', error));
  };

  const loadMore = getPhotos;

  const onItemPress = (photo: Photo, index: number) => {
    navigation?.navigate(ScreenName.detail, {
      photo,
    });
  };

  const output: CollectionDetailViewModel = {
    detail,
    isLoading,
    photos,
    getDetail,
    getPhotos,
    loadMore,
    onItemPress,
  };

  return output;
}
