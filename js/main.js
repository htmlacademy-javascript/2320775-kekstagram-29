import { getPictures } from './thumbnails/data.js';
import { makeAllThumbnail } from './thumbnails/thumbnails.js';
import { initUploadForm } from './upload-form/upload-form.js';

makeAllThumbnail(getPictures());
initUploadForm();
