import {createSlice} from '@reduxjs/toolkit';
import {clearToken, getToken, requestToken} from './action';

type AuthState = {
  token: string | undefined;
  isGettingToken: boolean;
  isRequestingToken: boolean;
  isClearingToken: boolean;
};

const initialState: AuthState = {
  token: undefined,
  isGettingToken: false,
  isRequestingToken: false,
  isClearingToken: false,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    clear: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getToken.pending, (state, action) => {
        state.isGettingToken = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.isGettingToken = false;
        state.token = action.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.isGettingToken = false;
        state.token = undefined;
      });

    builder
      .addCase(requestToken.pending, (state, action) => {
        state.isRequestingToken = true;
      })
      .addCase(requestToken.fulfilled, (state, action) => {
        state.isRequestingToken = false;
        state.token = action.payload;
      })
      .addCase(requestToken.rejected, (state, action) => {
        state.isRequestingToken = false;
        state.token = undefined;
      });

    builder
      .addCase(clearToken.pending, (state) => {
        state.isClearingToken = true
      })
      .addCase(clearToken.fulfilled, (state) => {
        state.isClearingToken = false
        state.token = undefined
      })
      .addCase(clearToken.rejected, (state) => {
        state.isClearingToken = false
      })
  },
});

export const {clear} = authSlice.actions;
export default authSlice.reducer;
