import { Photo } from "./Photo"
import { User } from "./User"
import { Links, Meta, Tag } from "./base"

export interface Collection {
  id: string
  title: string
  description: string | null
  published_at: string
  last_collected_at: string
  updated_at: string
  curated: boolean
  featured: boolean
  total_photos: number
  private: boolean
  share_key: string
  tags: Tag[]
  links: Links
  user: User
  cover_photo: Photo
  preview_photos: Photo[] | null
}

export interface FullCollection extends Collection {
  meta: Meta
}