import { makeAllThumbnail } from './thumbnails.js';
import { getData } from '../utils/api.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_GET_DATA = 'Ошибка загрузки данных. Перезагрузите страницу';
// const DELAY = 3000;

const onGetSuccess = (data) => makeAllThumbnail(data);
const onGetError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-get-data');
  errorMessage.textContent = ERROR_GET_DATA;
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, DELAY);
};

const getThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { getThumbnails };


