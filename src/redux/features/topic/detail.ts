import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrderBy, Photo} from '../../../services/api/type';
import {RootState} from '../../store/store';
import unsplash from '../../../services/api/unsplash';

type TopicDetailState = {
  id: string;
  isLoading: boolean;
  page: number;
  photos: Photo[];
};

const initialState: TopicDetailState = {
  id: '',
  isLoading: false,
  page: 0,
  photos: [],
};

const condition = (id: string, {getState}: {getState: () => RootState}) => {
  const {topicPhotos} = getState();
  return !topicPhotos.isLoading;
};
export const getTopicPhotos = createAsyncThunk<
  Photo[],
  string | 'nextPage',
  {state: RootState}
>(
  'getTopicPhotos',
  async (id, thunkApi) => {
    const state = thunkApi.getState().topicPhotos;

    const result = await unsplash.topics.getPhotos({
      topicIdOrSlug: id === 'nextPage' ? state.id : id,
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
    clear: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getTopicPhotos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTopicPhotos.fulfilled, (state, action) => {
      state.page += 1;
      state.isLoading = false;
      state.photos.push(...action.payload);
    });
    builder.addCase(getTopicPhotos.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {clear} = topicPhotosSlice.actions;
export default topicPhotosSlice.reducer;
