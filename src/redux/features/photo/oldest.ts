import { createSlice } from "@reduxjs/toolkit";
import { PhotoState } from "./state";
import { getPhotosOldest } from "./action";

const initialState: PhotoState = {
  isLoading: false,
  photos: [],
  page: 0
}

export const photoOldestSlice = createSlice({
  name: 'photosOldest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPhotosOldest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotosOldest.fulfilled, (state, action) => {
      state.photos = state.photos.concat(action.payload);
      state.page = state.page + 1;
      state.isLoading = false;
    });
    builder.addCase(getPhotosOldest.rejected, (state, action) => {
      state.isLoading = false;
      console.log('False')
    });
  },
});

export default photoOldestSlice.reducer;
