import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Photo} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';
import {OrderBy} from 'unsplash-js';
import { PaginationParams } from 'unsplash-js/dist/types/request';

interface PhotoState {
  isLoadingPhotos: boolean;
  photos: Photo[];
}

const initialState: PhotoState = {
  isLoadingPhotos: false,
  photos: [],
};

export const fetchPhotos = createAsyncThunk('fetchPhotos', async () => {
  const params : PaginationParams = {
    page: 1,
    perPage: 10,
    orderBy: OrderBy.LATEST,
  }
  
  const result = await unsplash.photos.list(params)
  return result.response?.results ?? []
});

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPhotos.pending, state => {
      state.isLoadingPhotos = true
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.photos = action.payload
      state.isLoadingPhotos = false
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.isLoadingPhotos = false
    });
  },
});

export default photoSlice.reducer;
