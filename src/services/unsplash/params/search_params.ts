import { SearchOrderBy } from "unsplash-js";
import { Color } from "../constants/Color";
import { ContentFilter } from "../constants/ContentFilter";
import { Orientation } from "../constants/Orientation";

export type SearchPhotosParams = {
  query: string; 
  page?: number; 
  per_page?: number; 
  order_by?: SearchOrderBy; 
  collections?: string; 
  content_filter?: ContentFilter; 
  color?: Color; 
  orientation?: Orientation; 
};

export type SearchCollectionParams = {
  query: string; 
  page?: number; 
  per_page?: number; 
};

export type SearchUserParams = {
  query: string; 
  page?: number; 
  per_page?: number; 
};
