import {createSlice} from '@reduxjs/toolkit';
import {Photo, Topic, Collection} from '../../../test/api/type';

interface HomeState {
  photos: Photo[];
  topics: Topic[];
  collections: Collection[];
};

const initialState: HomeState = {
  photos: [],
  topics: [],
  collections: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    loadPhotos: state => {
      //call api
    },
    loadTopics: state => {
      //call api
    },
    loadCollections: state => {
      //api
    },
  },
});

export const {loadPhotos, loadTopics, loadCollections} = homeSlice.actions
export default homeSlice.reducer