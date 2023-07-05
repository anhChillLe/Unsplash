import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CollectionWithTags, Photo} from '../../../services/api/type';
import {RootState} from '../../store/store';
import unsplash from '../../../services/api/unsplash';

type CollectionPhotosState = {
  isLoadingDetail: boolean;
  detail: CollectionWithTags | null;
  isLoading: boolean;
  page: number;
  photos: Photo[];
};

const initialState: CollectionPhotosState = {
  isLoadingDetail: false,
  detail: null,
  isLoading: false,
  page: 0,
  photos: [],
};

const condition = (
  collectionId: string,
  {getState}: {getState: () => RootState},
) => {
  const {collectionPhotos} = getState();
  return !collectionPhotos.isLoading;
};
export const getCollectionPhotos = createAsyncThunk<
  Photo[],
  string | 'nextPage',
  {state: RootState}
>(
  'getCollectionPhotos',
  async (collectionId, thunkApi) => {
    const state = thunkApi.getState().collectionPhotos;

    if (collectionId !== state.detail?.id) {
      state.photos = [];
    }

    const result = await unsplash.collections.getPhotos({
      collectionId:
        collectionId === 'nextPage'
          ? state.detail?.id ?? collectionId
          : collectionId,
      page: state.page + 1,
      perPage: 21,
    });

    return result.response?.results ?? [];
  },
  {condition},
);

export const getCollectionDetail = createAsyncThunk<
  CollectionWithTags,
  string,
  {state: RootState}
>('getCollectionDetail', async (collectionId, thunkApi) => {
  const result = await unsplash.collections.get({collectionId});
  const collection = result.response as CollectionWithTags;
  return collection;
});

const collectionPhotosSlice = createSlice({
  name: 'collectionPhotos',
  initialState,
  reducers: {
    clear: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getCollectionPhotos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCollectionPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photos = state.photos.concat(action.payload);
      state.page += 1;
    });
    builder.addCase(getCollectionPhotos.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getCollectionDetail.pending, state => {
      state.isLoadingDetail = true;
    });
    builder.addCase(getCollectionDetail.fulfilled, (state, action) => {
      state.isLoadingDetail = false;
      state.detail = action.payload;
    });
    builder.addCase(getCollectionDetail.rejected, state => {
      state.isLoadingDetail = false;
    });
  },
});

export const {clear} = collectionPhotosSlice.actions;
export default collectionPhotosSlice.reducer;