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
  total: number;
  total_page: number;
}

export const searchImage = createAsyncThunk<
  SearchOutput,
  SearchInput,
  {state: RootState}
>('searchImage', async (input, thunkApI) => {
  const state = thunkApI.getState().search;
  const result = await unsplash.search.getPhotos({
    ...input,
    page: 1,
    perPage: 21,
  });

  const output : SearchOutput = {
    query: input.query,
    photos: result.response?.results ?? [],
    total: result.response?.total ?? 0,
    total_page: result.response?.total_pages ?? 0,
  }
  return output
})

export const loadMoreSearchResult = createAsyncThunk<
  Photo[],
  SearchInput,
  {state: RootState}
>('loadMoreSearchResult', async (input, thunkApI) => {
  const state = thunkApI.getState().search;

  if(state.total_page < state.page) return []

  const result = await unsplash.search.getPhotos({
    ...input,
    page: state.page + 1,
    perPage: 21,
  });

  return result.response?.results ?? []
})