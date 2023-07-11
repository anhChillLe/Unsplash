import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import unsplash from '../../../services/unsplash';
import { UserProfile } from '../../../services/unsplash/models';

export const getCurrentUser = createAsyncThunk<
  UserProfile | undefined,
  void,
  {state: RootState}
>('getCurrentUser', async (_, thunkApi) => {
  const token = thunkApi.getState().auth.token;
  if (!token) return undefined;
  const useProfile = await unsplash.current_user.get();
  return useProfile;
});
