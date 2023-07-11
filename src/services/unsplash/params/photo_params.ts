import { OrderBy } from "../constants/OrderBy";

export type ListPhotoParams = {
  page?: number;
  per_page?: number;
  order_by?: OrderBy
}

export type ListRandomPhotosParams = {
  collections?: string; 
  topics?: string; 
  username?: string; 
  query?: string; 
  orientation?: 'landscape' | 'portrait' | 'squarish'; 
  content_filter?: 'low' | 'high'; 
  count?: number; 
};

export type UpdatePhotoParams= {
  id: string; 
  description?: string; 
  show_on_profile?: boolean; 
  tags?: string[]; 
  location?: {
    latitude?: number; 
    longitude?: number; 
    name?: string; 
    city?: string; 
    country?: string; 
  };
  exif?: {
    make?: string; 
    model?: string; 
    exposure_time?: string; 
    aperture_value?: string; 
    focal_length?: string; 
    iso_speed_ratings?: string; 
  };
};

