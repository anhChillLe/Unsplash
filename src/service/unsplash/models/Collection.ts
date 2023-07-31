import { User } from "./User"
import { BaseGroup, Links, Meta, Tag } from "./base"

export interface Collection  extends BaseGroup{
  published_at: string
  last_collected_at: string | null
  updated_at: string
  curated: boolean
  featured: boolean
  private: boolean
  share_key: string
  tags: Tag[]
  links: Links
  user: User
}

export interface FullCollection extends Collection {
  meta: Meta
}