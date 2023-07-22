import { createAsyncThunk } from "@reduxjs/toolkit"
import unsplashService from "../../../unsplash"
import { Photo } from "../../../unsplash/models"
import { RootState } from "../../store/store"

const getPopularPhotos = createAsyncThunk<Photo[], void, { state: RootState }>("getPopularPhotos", async () => {
	const data = await unsplashService.photo.list({
		page: 1,
		per_page: 5,
		order_by: "latest",
	})

	return data
})

export default getPopularPhotos
