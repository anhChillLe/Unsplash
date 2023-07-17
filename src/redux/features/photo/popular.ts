import { createSlice } from "@reduxjs/toolkit";
import getPopularPhotos from "./action";
import { Photo } from "../../../unsplash/models";

export interface PhotoState {
  isLoading: boolean;
  photos: Photo[];
  page: number;
}

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
    builder.addCase(getPopularPhotos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPopularPhotos.fulfilled, (state, action) => {
      state.photos = state.photos.concat(action.payload);
      state.page = state.page + 1;
      state.isLoading = false;
    });
    builder.addCase(getPopularPhotos.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default photoPopularSlice.reducer;
