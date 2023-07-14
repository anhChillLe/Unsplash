import { FullOrderBy, OrderBy } from "../constants/OrderBy";
import { Orientation } from "../constants/Orientation";

export type ListUserPhotosParams = {
  username: string;
  page?: number;
  per_page?: number;
  order_by?: FullOrderBy;
  stats?: boolean;
  resolution?: string;
  quantity?: number;
  orientation?: Orientation;
};

export type ListPhotoUserLikeParams = {
  username: string;
  page?: number;
  per_page?: number;
  order_by?: OrderBy;
  orientation?: Orientation;
}

export type ListUserCollectionParams = {
  username: string; 
  page?: number;
  per_page?: number;
};

export type GetUserStatisticsParams = {
  username: string; 
  resolution?: string; 
  quantity?: number; 
};