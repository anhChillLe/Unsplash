import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import unsplash from "../../../services/unsplash";
import { FullCollection, Photo } from "../../../services/unsplash/models";

type CollectionPhotosState = {
	isLoadingDetail: boolean;
	detail: FullCollection | null;
	isLoading: boolean;
	page: number;
	photos: Photo[];
};

const initialState: CollectionPhotosState = {
	isLoadingDetail: false,
	detail: null,
	isLoading: false,
	page: 0,
	photos: [],
};

const condition = (collectionId: string, { getState }: { getState: () => RootState }) => {
	const { collectionPhotos } = getState();
	return !collectionPhotos.isLoading;
};

export const getCollectionPhotos = createAsyncThunk<Photo[], string | "nextPage", { state: RootState }>(
	"getCollectionPhotos",
	async (collectionId, thunkApi) => {
		const state = thunkApi.getState().collectionPhotos;

		if (collectionId !== state.detail?.id) {
			state.photos = [];
		}

		const result = await unsplash.collection.getPhotos({
			id: collectionId,
			page: state.page + 1,
			per_page: 21,
		});

		return result
	},
	{ condition }
);

export const getCollectionDetail = createAsyncThunk<FullCollection, string, { state: RootState }>(
	"getCollectionDetail",
	async (collectionId, thunkApi) => {
		const result = await unsplash.collection.get(collectionId);
		return result;
	}
);

const collectionPhotosSlice = createSlice({
	name: "collectionPhotos",
	initialState,
	reducers: {
		clear: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getCollectionPhotos.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCollectionPhotos.fulfilled, (state, action) => {
			state.isLoading = false;
			state.photos = state.photos.concat(action.payload);
			state.page += 1;
		});
		builder.addCase(getCollectionPhotos.rejected, (state, action) => {
			state.isLoading = false;
		});

		builder.addCase(getCollectionDetail.pending, (state) => {
			state.isLoadingDetail = true;
		});
		builder.addCase(getCollectionDetail.fulfilled, (state, action) => {
			state.isLoadingDetail = false;
			state.detail = action.payload;
		});
		builder.addCase(getCollectionDetail.rejected, (state) => {
			state.isLoadingDetail = false;
		});
	},
});

export const { clear } = collectionPhotosSlice.actions;
export default collectionPhotosSlice.reducer;
