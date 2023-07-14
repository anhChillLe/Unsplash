import { Tag, User } from "../../api/type"
import { Photo } from "./Photo"
import { Links, Meta } from "./base"

export interface Collection {
  id: string
  title: string
  description: any
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