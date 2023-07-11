import { Photo } from "./Photo"
import { Links, ProfileImage, Social } from "./base"

export interface User {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: string
  twitter_username?: string
  portfolio_url?: string
  bio?: string
  location?: string
  links: Links
  profile_image: ProfileImage
  instagram_username?: string
  total_collections: number
  total_likes: number
  total_photos: number
  accepted_tos: boolean
  for_hire: boolean
  social: Social
  followed_by_user: boolean
  photos: Photo[]
}