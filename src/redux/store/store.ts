import {configureStore} from '@reduxjs/toolkit';
import topicReducer from '../features/topic/topics';
import collectionReducer from '../features/collection/collections';
import photoPopularReducer from '../features/photo/popular';
import authReducer from '../features/auth/auth'
import currentUserReducer from '../features/user/user'

export const store = configureStore({
  reducer: {
    photoPopular: photoPopularReducer,
    topic: topicReducer,
    collection: collectionReducer,
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
