export type ListTopicParams = {
	ids?: string
	page?: number
	per_page?: number
	order_by?: "featured" | "latest" | "oldest" | "position"
}

export type GetTopicPhotosParams = {
	id_or_slug: string
	page?: number
	per_page?: number
	orientation?: "landscape" | "portrait" | "squarish"
	order_by?: "latest" | "oldest" | "popular"
}
