import {useState} from 'react';
import {Photo} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';
import {Full, Stats} from 'unsplash-js/dist/methods/photos/types';

export type PhotoDetailViewModel = {
  isLoading: boolean;
  photo: Photo;
  fullPhoto: Full | undefined;
  stats: Stats | undefined;
  getStat: () => void;
  getDetail: () => void
};

export function getPhotoViewModel(photo: Photo) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | undefined>(undefined)
  const [fullPhoto, setFullPhoto] = useState<Full | undefined>()

  const getStat = () => {
    setLoading(true)
    unsplash.photos.getStats({photoId: photo.id})
    .then(apiResponse => apiResponse.response)
    .then(data => {
      setStats(data)
      setLoading(false)
    })
    .catch(error => {
      console.log('getStat: ', error)
    })
  }

  const getDetail = () => {
    unsplash.photos.get({
      photoId: photo.id
    }).then(apiResponse => apiResponse.response)
    .then(data => {
      setFullPhoto(data)
    })
    .catch(error => {
      console.log('getFullPhoto: ', error)
    })
  }

  const output: PhotoDetailViewModel = {
    isLoading,
    photo,
    fullPhoto,
    stats,
    getStat,
    getDetail,
  };

  return output
}
