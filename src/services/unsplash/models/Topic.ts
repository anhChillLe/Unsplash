import { Photo } from "./Photo"
import { User } from "./User"
import { Links } from "./base"

export interface Topic {
  id: string
  slug: string
  title: string
  description: string | null
  published_at: string
  updated_at: string
  starts_at: string
  ends_at: string | null
  only_submissions_after: any
  visibility: string
  featured: boolean
  total_photos: number
  current_user_contributions: any[]
  total_current_user_submissions: any
  links: Links
  status: string
  owners: User[]
  cover_photo: Photo | null
  preview_photos: Photo[] | null
}

export interface FullTopic extends Topic{
  top_contributors: User[]
}