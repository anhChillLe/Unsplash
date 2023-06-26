import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Collection} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';
import {OrderBy} from 'unsplash-js';
import {PaginationParams} from 'unsplash-js/dist/types/request';

interface CollectionsState {
  isLoadingCollections: boolean;
  collections: Collection[];
}

const initialState: CollectionsState = {
  isLoadingCollections: false,
  collections: [],
};

export const fetchCollections = createAsyncThunk(
  'fetchCollections',
  async () => {
    const params: PaginationParams = {
      page: 1,
      perPage: 10,
      orderBy: OrderBy.LATEST,
    };

    const result = await unsplash.collections.list(params);
    return result.response?.results ?? [];
  },
);

export const collectionsSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCollections.pending, state => {
      state.isLoadingCollections = true;
    });
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.isLoadingCollections = false;
    });
  },
});

export default collectionsSlice.reducer;
