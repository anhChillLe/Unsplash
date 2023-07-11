import {useRef, useState} from 'react';
import unsplashService from '../services/unsplash';
import {Collection, User} from '../services/api/type';

export interface UserCollectionViewModel {
  isLoading: boolean;
  user: User;
  collections: Collection[];
  listCollection: () => void;
  loadMore: () => void;
}

export function getUserCollectionViewmodel(user: User) {
  const page = useRef<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  const listCollection = () => {
    if(isLoading) return

    setLoading(true);
    unsplashService.user
      .listCollection({
        username: user.username,
        page: page.current + 1,
        per_page: 10,
      })
      .then(data => {
        const newCollection = [...collections, ...data];
        setCollections(newCollection);
        setLoading(false);
        page.current += 1;
      })
      .catch(error => {
        setLoading(false);
        console.log('getUserCollections: ', error);
      });
  };

  const loadMore = listCollection;

  const output: UserCollectionViewModel = {
    isLoading,
    user,
    collections,
    listCollection,
    loadMore,
  };

  return output;
}