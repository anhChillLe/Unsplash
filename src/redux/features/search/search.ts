import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import unsplash from '../../../services/api/unsplash';
import {RootState} from '../../store/store';
import {Photo, SearchFilterParams} from '../../../services/api/type';
import { loadMoreSearchResult, searchImage } from './actions';

export type SearchState = {
  isLoading: boolean;
  histories: string[];
  photos: Photo[];
  total: number;
  total_page: number;
  page: number;
};

const initialState: SearchState = {
  isLoading: false,
  histories: [],
  photos: [],
  total: 0,
  total_page: 0,
  page: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResult(state){
      state.page = 0;
      state.photos = []
    },
    removeHistory(state, action: PayloadAction<{value: string}>){
      state.histories = state.histories.filter(it => it !== action.payload.value)
    }
  },
  extraReducers: builder => {
    builder
    .addCase(searchImage.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(searchImage.fulfilled, (state, action) => {
      state.isLoading = false
      state.page = 1
      state.photos = action.payload.photos
      state.histories.push(action.payload.query)
      state.total = action.payload.total
      state.total_page = action.payload.total_page
    })
    .addCase(searchImage.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(loadMoreSearchResult.fulfilled, (state, action) => {
      state.isLoading = false
      state.page += 1
      state.photos.push(...action.payload)
    })
  }
})

export const {clearResult, removeHistory} = searchSlice.actions
export default searchSlice.reducer