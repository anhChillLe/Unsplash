import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import unsplash from '../../../services/api/unsplash';
import {RootState} from '../../store/store';
import {Photo, SearchFilterParams} from '../../../services/api/type';
import { searchImage } from './actions';

type SearchState = {
  isLoading: boolean;
  histories: string[];
  result: Photo[];
  page: number;
};

const initialState: SearchState = {
  isLoading: false,
  histories: [],
  result: [],
  page: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResult(state){
      state.page = 0;
      state.result = []
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
      state.page += 1
      state.result = action.payload.photos
      state.histories.push(action.payload.query)
    })
    .addCase(searchImage.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const {clearResult, removeHistory} = searchSlice.actions
export default searchSlice.reducer