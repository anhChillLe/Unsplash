import { createAsyncThunk } from "@reduxjs/toolkit"
import unsplash from "../../../service/unsplash"
import { Photo } from "../../../service/unsplash/models"
import { RootState } from "../../store/store"

const getPopularPhotos = createAsyncThunk<Photo[], void, { state: RootState }>("getPopularPhotos", async () => {
	const data = await unsplash.photo.list({
		page: 1,
		per_page: 5,
		order_by: "latest",
	})

	return data
})

export default getPopularPhotos
