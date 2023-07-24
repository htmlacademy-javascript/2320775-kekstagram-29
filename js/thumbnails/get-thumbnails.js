import { makeAllThumbnails } from './thumbnails.js';
import { showMessage } from '../upload-form/alert-messages.js';
import { getData } from '../utils/api.js';
import { initFilter } from './filter.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_TEXT = 'Ошибка загрузки данных';
const ERROR_GET_DATA = 'error';

const onGetSuccess = (data) => {
  initFilter(data);
  makeAllThumbnails(data);
};

const onGetError = () => showMessage(ERROR_TEXT, ERROR_GET_DATA);


const getThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { getThumbnails };
