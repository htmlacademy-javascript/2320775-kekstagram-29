import { showBigPictures } from './show-big-pictures.js';

const picturesContainer = document.querySelector('.pictures'); //Находит тег с классом в разметке (DOM-element)
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //Находит шаблон по id и через content его содержимое

//1. Создание DOM-элемента
//2. Наполнение шаблона данными
const makeOneThumbnail = ({ comments, description, likes, url }) => { //Метод деструктуризации массива для 4х переменных

  const thumbnail = pictureTemplate.cloneNode(true); //Клонирует содержимого шаблона
  const thumbnailPictureImg = thumbnail.querySelector('.picture__img');
  thumbnailPictureImg.src = url; //Использует точечную нотацию для обращения к свойству
  thumbnailPictureImg.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length; //Указывает количество комментариев
  thumbnail.querySelector('.picture__likes').textContent = likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPictures({ comments, description, likes, url }); //callback
  });

  return thumbnail;
};

//3. Функция для получения отрисованных элементов
const makeAllThumbnail = (pictures) => { //Принмает массив pictures
  const fragment = document.createDocumentFragment(); //Создание временного хранилища для элементов
  pictures.forEach((picture) => { //Цикл перебора данных массива picture
    const thumbnail = makeOneThumbnail(picture); //Создание одного DOM-элемента
    fragment.append(thumbnail); //ForEach принимает параметром функцию добавления элемента в хранилище
  });

  picturesContainer.append(fragment); //Добавляет созданный массив в DOM-дерево
};

export { makeAllThumbnail };
