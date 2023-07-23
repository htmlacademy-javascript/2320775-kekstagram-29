import { makeAllThumbnails } from './thumbnails.js';
import { getRandomInteger } from '../utils/utils.js';

const RANDOM_IMAGES_COUNT = 10;
const DELAY = 500;
const FILTERS = {
  random: 'filter-random',
  discussed: 'filter-discussed'
};

//Фильтрация изображений от других пользователей
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

let timeout;

const sortByCommentsCount = (data) => (data.slice().sort((a, b) => b.comments.length - a.comments.length));

const sortInRandomOrder = (data) => {
  const dataClone = data.slice();
  for (let i = dataClone.length - 1; i > 0; i--) {
    const j = getRandomInteger(data);
    [dataClone[i], dataClone[j]] = [dataClone[j], dataClone[i]];
  }

  return dataClone.slice(0, RANDOM_IMAGES_COUNT);
};

const getFilterinData = (id, data) => {
  switch (id) {
    case FILTERS.random:
      return sortInRandomOrder(data);
    case FILTERS.discussed:
      return sortByCommentsCount(data);
    default:
      return data;
  }
};

const renderFilteringPictures = (id, data) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  makeAllThumbnails(getFilterinData(id, data));
};

const initFilter = (data) => {
  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      clearTimeout(timeout); //Вместо debounse

      timeout = setTimeout(() => {
        renderFilteringPictures(evt.target.id, data);
      }, DELAY);
    }
  });
};

export { initFilter };
