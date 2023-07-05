import { getPictures } from './data.js';
import { makeAllThumbnail } from './thumbnails.js';
import { makeBigPicture } from './bigPicture-view.js';

makeAllThumbnail(getPictures());
