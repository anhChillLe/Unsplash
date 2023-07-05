import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Collection} from '../../../services/api/type';
import unsplash from '../../../services/api/unsplash';
import {OrderBy} from 'unsplash-js';
import {PaginationParams} from 'unsplash-js/dist/types/request';
import {RootState} from '../../store/store';

interface CollectionsState {
  isLoadingCollections: boolean;
  collections: Collection[];
  page: number;
}

const initialState: CollectionsState = {
  isLoadingCollections: false,
  collections: [],
  page: 0,
};

const condition = (arg: void, {getState}: {getState: () => RootState}) =>
  !getState().collection.isLoadingCollections;

export const fetchCollections = createAsyncThunk<
  Collection[],
  void,
  {state: RootState}
>(
  'fetchCollections',
  async (_, thunkApi) => {
    const {collection} = thunkApi.getState();

    const params: PaginationParams = {
      page: collection.page + 1,
      perPage: 10,
      orderBy: OrderBy.OLDEST,
    };

    const result = await unsplash.collections.list(params);
    return result.response?.results ?? [];
  },
  {condition},
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
      state.collections = state.collections.concat(action.payload);
      state.page = state.page + 1;
      state.isLoadingCollections = false;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.isLoadingCollections = false;
    });
  },
});

export default collectionsSlice.reducer;
