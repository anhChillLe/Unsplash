import {useState} from 'react';
import {Photo} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';
import {Stats} from 'unsplash-js/dist/methods/photos/types';

export type PhotoDetailViewModel = {
  isLoading: boolean;
  photo: Photo;
  stats: Stats | undefined;
  getPhotoDetail: () => void;
};

export function getPhotoViewModel(photo: Photo) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | undefined>(undefined)

  const getPhotoDetail = () => {
    setLoading(true)
    unsplash.photos.getStats({photoId: photo.id})
    .then(apiResponse => apiResponse.response)
    .then(data => {
      setStats(data)
      setLoading(false)
    })
    .catch(error => {
      console.log('getPhotoDetail: ', error)
    })
  }

  const output: PhotoDetailViewModel = {
    isLoading: isLoading,
    photo: photo,
    stats,
    getPhotoDetail,
  };

  return output
}
