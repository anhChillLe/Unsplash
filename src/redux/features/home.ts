import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Photo, Topic, Collection} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';
import {OrderBy} from 'unsplash-js';
import { PaginationParams } from 'unsplash-js/dist/types/request';

interface HomeState {
  isLoadingPhotos: boolean;
  photos: Photo[];
  topics: Topic[];
  collections: Collection[];
}

const initialState: HomeState = {
  isLoadingPhotos: false,
  photos: [],
  topics: [],
  collections: [],
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

export const fetchTopics = createAsyncThunk('fetchTopics', async () => {
  const result = await unsplash.topics.list({
    orderBy: 'latest'
  })
  return result.response?.results ?? []
})

export const fetchCollections = createAsyncThunk('fetchCollections', async () => {

  const params : PaginationParams = {
    page: 1,
    perPage: 10,
    orderBy: OrderBy.LATEST,
  }

  const result = await unsplash.collections.list(params)
  return result.response?.results ?? []

})

export const homeSlice = createSlice({
  name: 'home',
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

    builder.addCase(fetchTopics.pending, state => {});
    builder.addCase(fetchTopics.fulfilled,  (state, action) => {
      state.topics = action.payload
    })
    builder.addCase(fetchTopics.rejected, (state, action) => {});

    builder.addCase(fetchCollections.pending, state => {});
    builder.addCase(fetchCollections.fulfilled,  (state, action) => {
      state.collections = action.payload
    })
    builder.addCase(fetchCollections.rejected, (state, action) => {});
  },
});

export default homeSlice.reducer;
