import { Photo } from "./Photo"

export interface Links {
	self: string
	html: string
	downloads?: string
	photos?: string
	likes?: string
	portfolio?: string
	following?: string
	followers?: string
}

export interface ProfileImage {
	small: string
	medium: string
	large: string
}

export interface Social {
	instagram_username: string | null
	portfolio_url: string | null
	twitter_username: string | null
	paypal_email: string | null
}

export interface Tags {
	custom: any[]
	aggregated: any[]
}

export interface Tag {
	type: string
	title: string
}

export interface Meta {
	index: boolean
}

export interface Exif {
	make: string | null
	model: string | null
	name: string | null
	exposure_time: string | null
	aperture: string | null
	focal_length: string | null
	iso: number | null
}

export interface Location {
	city: string | null
	country: string | null
	name: string | null
	position: Position
}

export interface Position {
	latitude: number | null
	longitude: number | null
}

export interface Urls {
	raw: string
	full: string
	regular: string
	small: string
	thumb: string
	small_s3?: string
}

export interface BaseGroup {
	id: string
	description: string | null
	title: string
	cover_photo: Photo | null
	preview_photos: Photo[] | null
  total_photos: number
}

export interface TopicSubmissions {}
