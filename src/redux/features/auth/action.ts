import {createAsyncThunk} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import {RootState} from '../../store/store';
import {ACCESS_KEY, SECRET_KEY} from '@env';
import {Linking} from 'react-native';

const getToken = createAsyncThunk<string | undefined, void, {state: RootState}>(
  'getToken',
  async (_, thunkApi) => {
    const credential = await Keychain.getGenericPassword();
    if (!credential) return undefined;
    const token = credential.password;
    return token;
  },
);

const setToken = createAsyncThunk<boolean, string, {state: RootState}>(
  'setToken',
  async (token: string, thunkApi) => {
    const result = await Keychain.setGenericPassword('unsplash', token);
    return !!result;
  },
);

const clearToken = createAsyncThunk<boolean, void, {state: RootState}>(
  'clearToken',
  async (_, thunkApi) => {
    // Keychain.
    return false
  }
)

const Login = () => {
  const url = `https://unsplash.com/oauth/authorize?client_id=${ACCESS_KEY}&redirect_uri=unsplash://app/login_success&response_type=code&scope=public`;
  Linking.openURL(url);
};

const base = 'https://unsplash.com/oauth/token?';
const direct = 'unsplash://app/login_success';
const type = 'authorization_code';

const requestToken = createAsyncThunk<
  string | undefined,
  string,
  {state: RootState}
>('requestToken', async (code, thunkApi) => {
  const url = `${base}client_id=${ACCESS_KEY}&client_secret=${SECRET_KEY}&redirect_uri=${direct}&code=${code}&grant_type=${type}`;

  const ressult = await fetch(url, {method: 'POST'});

  try {
    const data = (await ressult.json()) as Result;
    Keychain.setGenericPassword('unsplash', data.access_token)
    return data.access_token;
  } catch (error) {
    console.log('RequestToken result: ', ressult)
    console.log('RequestToken error: ', error);
    return undefined;
  }
});

export {getToken, setToken, requestToken}

type Result = {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
};
