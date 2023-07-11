import {ACCESS_KEY} from '@env';
import {createApi} from 'unsplash-js';

console.log(ACCESS_KEY)

const unsplash = createApi({accessKey: ACCESS_KEY});

export default unsplash;
