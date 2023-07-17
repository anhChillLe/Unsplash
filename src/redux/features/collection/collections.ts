import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import unsplashService from "../../../unsplash"
import { Collection } from "../../../unsplash/models"
import { RootState } from "../../store/store"

interface CollectionsState {
	isLoading: boolean
	collections: Collection[]
	page: number
}

const initialState: CollectionsState = {
	isLoading: false,
	collections: [],
	page: 0,
}

const condition = (arg: void, { getState }: { getState: () => RootState }) => !getState().collection.isLoading
export const fetchCollections = createAsyncThunk<Collection[], void, { state: RootState }>(
	"fetchCollections",
	async (_, thunkApi) => {
		const { collection } = thunkApi.getState()
		const data = await unsplashService.collection.list({
			page: collection.page + 1,
			per_page: 10,
		})
		return data
	},
	{ condition }
)

export const collectionsSlice = createSlice({
	name: "collection",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCollections.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchCollections.fulfilled, (state, action) => {
			state.collections = state.collections.concat(action.payload)
			state.page = state.page + 1
			state.isLoading = false
		})
		builder.addCase(fetchCollections.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export default collectionsSlice.reducer
