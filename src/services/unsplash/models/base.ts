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

export interface Exif {
  make: string
  model: string
  name: string
  exposure_time: string
  aperture: string
  focal_length: string
  iso: number
}

export interface Location {
  name: string
  city: any
  country: any
  position: Position
}

export interface Position {
  latitude: number
  longitude: number
}

export interface Urls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export interface TopicSubmissions {}
