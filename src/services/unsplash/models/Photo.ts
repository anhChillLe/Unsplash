import {Collection, User} from '../../api/type';
import {Exif, Links, Location, Meta, Urls} from './base';

export interface Photo {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: any;
  alt_description: string;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: Collection[];
  sponsorship: any;
  topic_submissions: TopicSubmissions;
  user: User;
}

export interface FullPhoto extends Photo {
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  views: number;
  downloads: number;
  related_collections: RelatedCollections;
}

type RelatedCollections = {
  total: number;
  type: string;
  results: Collection[];
};

export interface TopicSubmissions {}
