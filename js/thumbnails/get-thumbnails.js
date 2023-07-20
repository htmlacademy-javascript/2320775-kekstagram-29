import { makeAllThumbnail } from './thumbnails.js';
import { showMessage } from '../upload-form/alert-messages.js';
import { getData } from '../utils/api.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_GET_DATA = 'Ошибка загрузки данных. Перезагрузите страницу';
const DELAY = 3000;

const onGetSuccess = (data) => makeAllThumbnail(data);

const onGetError = () => {
  showMessage('error-get-data', ERROR_GET_DATA, false);
  setTimeout(() => {
    showMessage.remove();
  }, DELAY);
};

const getThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { getThumbnails };


