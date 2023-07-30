import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import unsplash from "../../../service/unsplash"
import { Topic } from "../../../service/unsplash/models"
import { RootState } from "../../store/store"

interface TopicsState {
	isLoading: boolean
	topics: Topic[]
	page: number
}

const initialState: TopicsState = {
	isLoading: false,
	topics: [],
	page: 0,
}

const condition = (arg: void, { getState }: { getState: () => RootState }) => !getState().topic.isLoading
export const fetchTopics = createAsyncThunk<Topic[], undefined, { state: RootState }>(
	"fetchTopics",
	async (_, thunkApi) => {
		const { topic } = thunkApi.getState()

		const data = await unsplash.topic.list({
			page: topic.page + 1,
			per_page: 10,
			order_by: "featured",
		})
		return data
	},
	{ condition }
)

export const topicSlice = createSlice({
	name: "topic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTopics.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchTopics.fulfilled, (state, action) => {
				state.topics = [...state.topics, ...action.payload]
				state.page += 1
				state.isLoading = false
			})
			.addCase(fetchTopics.rejected, (state, action) => {
				state.isLoading = false
			})
	},
})

export default topicSlice.reducer
