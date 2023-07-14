export interface StatTotal {
  total_photos: number
  photo_downloads: number
  photos: number
  downloads: number
  views: number
  photographers: number
  pixels: number
  downloads_per_second: number
  views_per_second: number
  developers: number
  applications: number
  requests: number
}

export interface StatMonth {
  downloads: number
  views: number
  new_photos: number
  new_photographers: number
  new_pixels: number
  new_developers: number
  new_applications: number
  new_requests: number
}
