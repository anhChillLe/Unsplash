import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import unsplash from "../../../services/api/unsplash";
import { OrderBy, Photo } from "../../../services/api/type";

const condition = (id: string, {getState}: {getState: () => RootState}) => {
  const {topicPhotos} = getState();
  return !topicPhotos.isLoading;
};
export const getTopicPhotos = createAsyncThunk<
  Photo[],
  string | 'nextPage',
  {state: RootState}
>(
  'getTopicPhotos',
  async (id, thunkApi) => {
    const state = thunkApi.getState().topicPhotos;

    const result = await unsplash.topics.getPhotos({
      topicIdOrSlug: id === 'nextPage' ? state.id : id,
      page: state.page + 1,
      perPage: 21,
      orderBy: OrderBy.LATEST,
    });
    return result.response?.results ?? [];
  },
  {condition},
);

// const condition = (id: string, {getState}: {getState: () => RootState}) => {
//   const {topicPhotos} = getState();
//   return !topicPhotos.isLoading;
// };
// export const getTopicPhotos = createAsyncThunk<
//   Photo[],
//   string | 'nextPage',
//   {state: RootState}
// >(
//   'getTopicPhotos',
//   async (id, thunkApi) => {
//     const state = thunkApi.getState().topicPhotos;

//     const result = await unsplash.topic.photos({
//       id_or_slug: id === 'nextPage' ? state.id : id,
//       page: state.page + 1,
//       per_page: 21,
//       order_by: 'latest',
//     });
//     return result
//   },
//   {condition},
// );