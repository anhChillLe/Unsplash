import { SearchOrderBy } from "unsplash-js"
import { ColorId } from "../constants/Color"
import { ContentFilter } from "../constants/ContentFilter"
import { Orientation } from "../constants/Orientation"

type Basic = {
	query: string
	page?: number
	per_page?: number
}

export type Fillter = {
	order_by?: SearchOrderBy
	collections?: string
	content_filter?: ContentFilter
	color?: ColorId
	orientation?: Orientation
}

export type SearchPhotosParams = Fillter & Basic

export type SearchCollectionParams = Basic

export type SearchUserParams = Basic
