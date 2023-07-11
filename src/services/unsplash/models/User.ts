import { Photo } from "./Photo"
import { Links, Meta, ProfileImage, Social } from "./base"

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

export interface FullUser extends User{
  badge: any | null;
  // tags: Tags;
  // tags_preview: Tags;
  followers_count: number;
  following_count: number;
  allow_messages: boolean;
  numeric_id: number;
  downloads: number;
  meta: Meta;
  uid: string;
  confirmed: boolean;
  uploads_remaining: number;
  unlimited_uploads: boolean;
  email: string;
  dmca_verification: string;
  unread_in_app_notifications: boolean;
  unread_highlight_notifications: boolean;
}