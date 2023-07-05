import { createSlice } from "@reduxjs/toolkit";
import { PhotoState } from "./state";
import { getPhotosLatest } from "./action";

const initialState: PhotoState = {
  isLoading: false,
  photos: [],
  page: 0
}

export const photoLatestSlice = createSlice({
  name: 'photosLatest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPhotosLatest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotosLatest.fulfilled, (state, action) => {
      state.photos = state.photos.concat(action.payload);
      state.page = state.page + 1;
      state.isLoading = false;
    });
    builder.addCase(getPhotosLatest.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default photoLatestSlice.reducer;