export type ListCollectionParams = {
  page?: number;
  per_page?: number;
}

export type GetCollectionPhotosParams = {
  id: string; 
  page?: number; 
  per_page?: number; 
  orientation?: 'landscape' | 'portrait' | 'squarish'; 
};

export type CreateCollectionParams = {
  title: string; 
  description?: string; 
  private?: boolean; 
};

export type AddPhotoToCollectionParams = {
  collection_id: string; 
  photo_id: string; 
};

export type RemovePhotoToCollectionParams = {
  collection_id: string; 
  photo_id: string; 
};