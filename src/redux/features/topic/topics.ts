import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import unsplashService from "../../../unsplash"
import { Topic } from "../../../unsplash/models"

interface TopicsState {
	isLoading: boolean
	topics: Topic[]
}

const initialState: TopicsState = {
	isLoading: true,
	topics: [],
}

export const fetchTopics = createAsyncThunk("fetchTopics", async () => {
	const data = await unsplashService.topic.list({
		order_by: "latest",
	})
	return data
})

export const topicSlice = createSlice({
	name: "topic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTopics.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchTopics.fulfilled, (state, action) => {
			state.topics = [...state.topics, ...action.payload]
			state.isLoading = false
		})
		builder.addCase(fetchTopics.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export default topicSlice.reducer
