import {createSlice} from '@reduxjs/toolkit';
import {UserProfile} from '../../../services/api/models/userProfile';
import {getCurrentUser} from './action';

type CurrentUser = {
  isLoading: boolean;
  profile: UserProfile | undefined;
};

const initialState: CurrentUser = {
  isLoading: false,
  profile: undefined,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    clear: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default currentUserSlice.reducer
