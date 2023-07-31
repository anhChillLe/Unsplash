import { configureStore } from "@reduxjs/toolkit"
import topicReducer from "../features/topic/topics"
import collectionReducer from "../features/collection/collections"
import photoPopularReducer from "../features/photo/popular"
import authReducer from "../features/auth/auth"
import currentUserReducer from "../features/user/user"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
	reducer: {
		photoPopular: photoPopularReducer,
		topic: topicReducer,
		collection: collectionReducer,
		auth: authReducer,
		user: currentUserReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAuthState = () => useAppSelector(state => state.auth)
export const usePhotoState = () => useAppSelector(state => state.photoPopular)
export const useCollectionState = () => useAppSelector(state => state.collection)
export const useTopicState = () => useAppSelector(state => state.topic)
export const useUserState = () => useAppSelector(state => state.user)