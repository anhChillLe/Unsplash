import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrderBy} from 'unsplash-js';
import {Photo} from '../../../services/api/type';
import {RootState} from '../../store/store';
import unsplash from '../../../services/api/unsplash';


export function getPhotosAction(typePrefix: string, order: OrderBy) {
  const condition = (arg: void, {getState}: {getState: () => RootState}) => {
    const {photoLatest, photoOldest, photoPopular} = getState();

    let state = photoLatest
    switch (order) {
      case OrderBy.LATEST:
        state = photoLatest
        break;
      case OrderBy.OLDEST:
        state = photoOldest
        break;
      case OrderBy.POPULAR:
        state = photoPopular
        break;
    }

    return !state.isLoading;
  };

  return createAsyncThunk<Photo[], void, {state: RootState}>(
    typePrefix,
    async (_, thunkApi) => {
      const {photoLatest, photoOldest, photoPopular} = thunkApi.getState();
      let page = 0;

      switch (order) {
        case OrderBy.LATEST:
          page = photoLatest.page;
          break;
        case OrderBy.OLDEST:
          page = photoOldest.page;
          break;
        case OrderBy.POPULAR:
          page = photoPopular.page;
          break;
      }

      const result = await unsplash.photos.list({
        page: page + 1,
        perPage: 20,
        orderBy: order,
      });
      return result.response?.results ?? [];
    },
    {condition}
  );
}

export const getPhotosLatest = getPhotosAction(
  'getPhotosLatest',
  OrderBy.LATEST,
);
export const getPhotosOldest = getPhotosAction(
  'getPhotosOldest',
  OrderBy.OLDEST,
);
export const getPhotosPopular = getPhotosAction(
  'getPhotosPopular',
  OrderBy.POPULAR,
);

export function getPhotos(order: OrderBy) {
  switch (order) {
    case OrderBy.LATEST:
      return getPhotosLatest;
    case OrderBy.OLDEST:
      return getPhotosOldest;
    case OrderBy.POPULAR:
      return getPhotosPopular;
    default:
      return getPhotosLatest;
  }
}
