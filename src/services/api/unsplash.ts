import { ACCESS_KEY } from '@env';
import {createApi} from 'unsplash-js';

const unsplash = createApi({accessKey: ACCESS_KEY});

export default unsplash;
