import { Collection } from "./Collection"
import { User } from "./User"
import { Exif, Links, Location, Meta, Tag, TopicSubmissions, Urls } from "./base"

export interface BasicPhoto {
	id: string
	urls: Urls
}

export interface Photo extends BasicPhoto {
	slug: string
	created_at: string
	updated_at: string
	promoted_at: string | null
	width: number
	height: number
	color: string | null
	blur_hash: string | null
	description: string | null
	alt_description: string | null
	links: Links
	likes: number
	liked_by_user: boolean
	current_user_collections: Collection[]
	sponsorship: any
	topic_submissions: TopicSubmissions
	user: User
}

export interface FullPhoto extends Photo {
	exif: Exif
	location: Location
	tags: Tag[]
	meta: Meta
	public_domain: boolean
	views: number
	downloads: number
	related_collections: RelatedCollections
}

export type RelatedCollections = {
	total: number
	type: string
	results: Collection[]
}
