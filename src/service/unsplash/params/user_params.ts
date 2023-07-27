import { FullOrderBy, OrderBy } from "../constants/OrderBy"
import { Orientation } from "../constants/Orientation"

export type ListUserPhotosParams = {
	username: string
	page?: number
	per_page?: number
	order_by?: FullOrderBy
	stats?: boolean
	resolution?: string
	quantity?: number
	orientation?: Orientation
}

export type ListPhotoUserLikeParams = {
	username: string
	page?: number
	per_page?: number
	order_by?: OrderBy
	orientation?: Orientation
}

export type ListUserCollectionParams = {
	username: string
	page?: number
	per_page?: number
}

export type GetUserStatisticsParams = {
	username: string
	resolution?: "days"
	quantity?: Range<1, 31>
}

type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
	? ((t: T, ...a: A) => void) extends (...x: infer X) => void
		? X
		: never
	: never

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
	0: A
	1: EnumerateInternal<PrependNextNum<A>, N>
}[N extends A["length"] ? 0 : 1]

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never

export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>
