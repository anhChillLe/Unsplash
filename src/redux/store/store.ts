import {configureStore} from '@reduxjs/toolkit';
import photoReducer from '../features/photos';
import topicReducer from '../features/topics';
import collectionReducer from '../features/collections';

export const store = configureStore({
  reducer: {
    photo: photoReducer,
    topic: topicReducer,
    collection: collectionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
