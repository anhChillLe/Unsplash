import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Topic} from '../../services/api/type';
import unsplash from '../../services/api/unsplash';

interface TopicsState {
  isLoadingTopics: boolean;
  topics: Topic[];
}

const initialState: TopicsState = {
  isLoadingTopics: false,
  topics: [],
};

export const fetchTopics = createAsyncThunk('fetchTopics', async () => {
  const result = await unsplash.topics.list({
    orderBy: 'latest'
  })
  return result.response?.results ?? []
})

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTopics.pending, state => {
      state.isLoadingTopics = true
    });
    builder.addCase(fetchTopics.fulfilled, (state, action) => {
      state.topics = action.payload
      state.isLoadingTopics = false
    });
    builder.addCase(fetchTopics.rejected, (state, action) => {
      state.isLoadingTopics = false
    });
  },
});

export default topicSlice.reducer;
