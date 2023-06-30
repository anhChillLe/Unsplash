import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import {Basic as Topic} from 'unsplash-js/dist/methods/topics/types';
import {Basic as Collection} from 'unsplash-js/dist/methods/collections/types';
import {Basic as User} from 'unsplash-js/dist/methods/users/types';
import {VeryBasic as Base} from 'unsplash-js/dist/methods/photos/types';
import { OrderBy } from 'unsplash-js';
import { Orientation } from 'unsplash-js';

export type {Photo, Topic, Collection, User, Base, Orientation, Tag, CollectionWithTags};
export {OrderBy}

type CollectionWithTags = Collection & {tags: Tag[]}
type Tag = {
  type: string,
  title: string,
}