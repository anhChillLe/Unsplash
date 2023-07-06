import {configureStore} from '@reduxjs/toolkit';
import topicReducer from '../features/topic/topics';
import collectionReducer from '../features/collection/collections';
import photoLatestReducer from '../features/photo/latest';
import photoOldestReducer from '../features/photo/oldest';
import photoPopularReducer from '../features/photo/popular';
import collectionPhotosReducer from '../features/collection/photos';
import topicPhotosReducer from '../features/topic/detail';
import searchReducer from '../features/search/search';
import authReducer from '../features/auth/auth'
import currentUserReducer from '../features/user/user'

export const store = configureStore({
  reducer: {
    photoLatest: photoLatestReducer,
    photoOldest: photoOldestReducer,
    photoPopular: photoPopularReducer,

    topic: topicReducer,
    topicPhotos: topicPhotosReducer,
    collection: collectionReducer,
    collectionPhotos: collectionPhotosReducer,
    search: searchReducer,
    auth: authReducer,

    user: currentUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
