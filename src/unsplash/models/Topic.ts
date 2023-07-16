import { User } from "./User"
import { BaseGroup, Links } from "./base"

export interface Topic extends BaseGroup{
  slug: string
  published_at: string
  updated_at: string
  starts_at: string
  ends_at: string | null
  only_submissions_after: any
  visibility: string
  featured: boolean
  current_user_contributions: User[]
  total_current_user_submissions: any
  links: Links
  status: string
  owners: User[]
}

export interface FullTopic extends Topic{
  top_contributors: User[]
}