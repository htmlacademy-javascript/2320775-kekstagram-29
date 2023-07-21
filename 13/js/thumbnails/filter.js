import { makeAllThumbnails } from './thumbnails.js';
import { getRandomInteger } from '../utils/utils.js';

const RANDOM_IMAGES_COUNT = 10; //Случайные — 10 случайных, не повторяющихся фотографий.
const DELAY = 500;
const FILTERS = {
  random: 'filter-random', //<button type=button class="img-filters__button" id="filter-random">Случайные</button>
  discussed: 'filter-discussed' //<button type=button class="img-filters__button" id="filter-discussed">Обсуждаемые</button>
};
//Фильтрация изображений от других пользователей <section class="img-filters  img-filters--inactive  container">
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
//Контейнер для изображений от других пользователей <section class="pictures  container">
const picturesContainer = document.querySelector('.pictures');

let timeout;

const sortByCommentsCount = (data) => (data.slice().sort((a, b) => b.comments.length - a.comments.length));

const sortInRandomOrder = (data) => {
  const dataClone = data.slice();
  for (let i = dataClone.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, dataClone.length);
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
      return data; //<button type=button class="img-filters__button img-filters__button--active" id="filter-default">По умолчанию</button>
  }
};

const renderFilteringPictures = (id, data) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  makeAllThumbnails(getFilterinData(id, data));
};

const initFilter = (data) => {
  imgFilters.classList.remove('img-filters--inactive'); //<section class="img-filters  img-filters--inactive  container">

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
