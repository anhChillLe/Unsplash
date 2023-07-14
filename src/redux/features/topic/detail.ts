import { createSlice } from '@reduxjs/toolkit';
import { getTopicPhotos } from './action';
import { Photo } from '../../../services/api/type';

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
