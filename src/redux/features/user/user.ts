import { createSlice } from "@reduxjs/toolkit"
import { getCurrentUser, updateCurrentUser } from "./action"
import { FullUser } from "../../../service/unsplash/models"

type CurrentUser = {
	isLoading: boolean
	profile?: FullUser
}

const initialState: CurrentUser = {
	isLoading: false,
}

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		clear: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentUser.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.profile = action.payload
			})
			.addCase(getCurrentUser.rejected, (state, action) => {
				state.isLoading = false
			})

		builder
			.addCase(updateCurrentUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.profile = action.payload
			})
			.addCase(updateCurrentUser.rejected, (state, action) => {
				state.isLoading = false
			})
	},
})

export default currentUserSlice.reducer
