import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrderBy, Photo} from '../../../services/api/type';
import {RootState} from '../../store/store';
import unsplash from '../../../services/api/unsplash';

type TopicDetailState = {
  id: string;
  isLoadingPhoto: boolean;
  page: number;
  photos: Photo[];
};

const initialState: TopicDetailState = {
  id: '',
  isLoadingPhoto: false,
  page: 0,
  photos: [],
};

const condition = (id: string, {getState}: {getState: () => RootState}) => {
  const {collectionPhotos} = getState();
  return !collectionPhotos.isLoading;
};
export const getTopicPhotos = createAsyncThunk<
  Photo[],
  string,
  {state: RootState}
>(
  'getTopicPhotos',
  async (id, thunkApi) => {
    const state = thunkApi.getState().topicPhoto;

    const result = await unsplash.topics.getPhotos({
      topicIdOrSlug: id,
      page: state.page + 1,
      perPage: 21,
      orderBy: OrderBy.LATEST,
    });
    return result.response?.results ?? [];
  },
  {condition},
);

const topicPhotosSlice = createSlice({
  name: 'topicPhotos',
  initialState,
  reducers: {
    clear(state, action: PayloadAction<{id: string}>) {
      if (state.id === action.payload.id) {
        (state = initialState), (state.id = action.payload.id);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getTopicPhotos.pending, state => {
      state.isLoadingPhoto = true;
    });
    builder.addCase(getTopicPhotos.fulfilled, (state, action) => {
      state.page += 1;
      state.isLoadingPhoto = false;
      state.photos.push(...action.payload);
    });
    builder.addCase(getTopicPhotos.rejected, (state, action) => {
      state.isLoadingPhoto = false;
    });
  },
});

export const {clear} = topicPhotosSlice.actions;
export default topicPhotosSlice.reducer;
