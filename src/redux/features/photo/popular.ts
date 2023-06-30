import { createSlice } from "@reduxjs/toolkit";
import { PhotoState } from "./state";
import { getPhotosPopular } from "./action";

const initialState: PhotoState = {
  isLoading: false,
  photos: [],
  page: 0
}

export const photoPopularSlice = createSlice({
  name: 'photosPopular',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPhotosPopular.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotosPopular.fulfilled, (state, action) => {
      state.photos = state.photos.concat(action.payload);
      state.page = state.page + 1;
      state.isLoading = false;
    });
    builder.addCase(getPhotosPopular.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default photoPopularSlice.reducer;
