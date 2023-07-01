import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo, SearchFilterParams} from '../../../services/api/type';
import {RootState} from '../../store/store';
import unsplash from '../../../services/api/unsplash';

export type SearchInput = SearchFilterParams & {
  query: string;
}

export type SearchOutput = {
  query: string;
  photos: Photo[];
}

export const searchImage = createAsyncThunk<
SearchOutput,
  SearchInput,
  {state: RootState}
>('searchImage', async (input, thunkApI) => {
  const state = thunkApI.getState().search;
  const result = await unsplash.search.getPhotos({
    ...input,
    page: state.page + 1,
    perPage: 21,
  });
  return {
    query: input.query,
    photos: result.response?.results ?? []
  }
});
