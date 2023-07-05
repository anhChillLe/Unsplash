import { Photo } from "../../../services/api/type";

export interface PhotoState {
  isLoading: boolean;
  photos: Photo[];
  page: number;
}