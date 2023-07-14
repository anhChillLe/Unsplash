import {useState} from 'react';
import {Photo} from '../services/api/type';
import unsplashService from '../services/unsplash';
import {FullPhoto} from '../services/unsplash/models/Photo';

export type PhotoDetailViewModel = {
  isLoading: boolean;
  photo: Photo;
  fullPhoto: FullPhoto | undefined;
  getDetail: () => void;
  like: () => void;
};

export function getPhotoViewModel(photo: Photo) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fullPhoto, setFullPhoto] = useState<FullPhoto | undefined>();

  const getDetail = () => {
    setLoading(true);
    unsplashService.photo
      .get(photo.id)
      .then(data => {
        setFullPhoto(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('getFullPhoto: ', error);
        setLoading(false);
      });
  };

  const like = () => {
    if (!fullPhoto) return;
    const liked_by_user = fullPhoto.liked_by_user;
    setLike(!liked_by_user);

    if (!liked_by_user) {
      unsplashService.photo.like(photo.id).then(data => {
        if (data.photo.liked_by_user) return;
        setLike(false);
      });
    } else {
      unsplashService.photo.unLike(photo.id).then(data => {
        if (!data.photo.liked_by_user) return;
        setLike(true);
      });
    }
  };

  function setLike(isLike: boolean) {
    if (!fullPhoto) return;

    const newPhoto: FullPhoto = {
      ...fullPhoto,
      liked_by_user: isLike,
      likes: isLike ? fullPhoto.likes + 1 : fullPhoto.likes - 1,
    };
    setFullPhoto(newPhoto);
  }

  const output: PhotoDetailViewModel = {
    isLoading,
    photo,
    fullPhoto,
    getDetail,
    like,
  };

  return output;
}
