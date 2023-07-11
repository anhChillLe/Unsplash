import {ACCESS_KEY, API_URL} from '@env';
import * as Keychain from 'react-native-keychain';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {setupCache} from 'axios-cache-interceptor';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Client-ID ${ACCESS_KEY}`,
  'X-Ratelimit-Limit': 1000,
  'X-Ratelimit-Remaining': 999,
};

const API = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers,
  transformResponse: data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw Error(`Parse data error: ${error}, data: ${data}`);
    }
  },
});

API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const credential = await Keychain.getGenericPassword();
    config.headers.Authorization = credential
      ? `Bearer ${credential.password}`
      : `Client-ID ${ACCESS_KEY}`;
    return config;
  },
  (error: any) => {
    console.log('request error: ', error);
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    console.log('response error: ', error);
    const originalRequest = error.config;
    return Promise.reject(error);
  },
);

const unsplash = setupCache(API, {
  methods: ['get']
});

export default unsplash
