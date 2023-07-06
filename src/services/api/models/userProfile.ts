export interface UserProfile {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  links: Links;
  profile_image: ProfileImage;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
  followed_by_user: boolean;
  photos: any[];
  badge: null;
  tags: Tags;
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

export interface Links {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
}

export interface Tags {
  custom: any[];
  aggregated: any[];
}

export interface Meta {
  index: boolean;
}
