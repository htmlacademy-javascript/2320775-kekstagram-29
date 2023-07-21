import { showBigPictures } from './show-big-pictures.js';

const picturesContainer = document.querySelector('.pictures'); //Находит тег с классом в разметке (DOM-element)
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //Находит шаблон по id и через content его содержимое

//1. Создание DOM-элемента
//2. Наполнение шаблона данными
const makeOneThumbnail = (item) => {
  const template = pictureTemplate.cloneNode(true);
  const img = template.querySelector('.picture__img');
  const comments = template.querySelector('.picture__comments');
  const likes = template.querySelector('.picture__likes');

  img.src = item.url;
  img.alt = item.description;
  comments.textContent = item.comments.length;
  likes.textContent = item.likes;
  template.addEventListener('click', (event) => {
    event.preventDefault();
    showBigPictures(item);
  });

  return template;
};

//3. Функция для получения отрисованных элементов
const makeAllThumbnails = (data) => {
  data.forEach((item) => picturesContainer.append(makeOneThumbnail(item)));
};

export { makeAllThumbnails };
