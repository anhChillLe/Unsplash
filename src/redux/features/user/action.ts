import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../../services/api/user';
import {RootState} from '../../store/store';
import {UserProfile} from '../../../services/api/models/userProfile';

export const getCurrentUser = createAsyncThunk<
  UserProfile | undefined,
  void,
  {state: RootState}
>('getCurrentUser', async (_, thunkApi) => {
  const token = thunkApi.getState().auth.token;
  if (!token) return undefined;
  const useProfile = await UserService.getCurrentUser();
  return useProfile;
});
