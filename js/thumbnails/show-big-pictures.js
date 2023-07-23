//Отображение комментариев по 5
import { isEscapeEvent } from '../utils/utils.js';

const COMMENTS_COUNTER = 5;

//Открытие-закрытие окна с изображением
const bigPicture = document.querySelector('.big-picture'); //<section class="big-picture overlay hidden">
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //<button type="reset" class="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button>

//Добавление информации к большому изображению при открытии окна
const bigPictureImage = bigPicture.querySelector('.big-picture__img img'); //<div class="big-picture__img">
const likesCount = bigPicture.querySelector('.likes-count'); //<class="social__likes">Нравится <span class="likes-count">356</span>
const socialCommentsList = bigPicture.querySelector('.social__comments'); //<ul class="social__comments">
const socialCommentsItem = bigPicture.querySelector('.social__comment'); //<li class="social__comment">
const socialCommentCaption = bigPicture.querySelector('.social__caption'); //<p class="social__caption">Тестим новую камеру! =)</p>
const socialCommentsLoader = bigPicture.querySelector('.comments-loader'); //<button type="button" class="social__comments-loader comments-loader">Загрузить еще</button>
const socialCommentsCount = bigPicture.querySelector('.social__comment-count'); //<div class="social__comment-count">5 из <span class="comments-count">125</span> комментариев</div>

let showCommentsCount = 0;
let comments; //Создаём переменную, в которую при открытии окна с изображением добавляется data.comments из thumbnails

//Заполняет строку .social__comment-count данными
const fillCommentsCounter = () => {
  socialCommentsCount.innerHTML = `${showCommentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
};

//Добавляет скрытие и отображение классов hidden кнопке "загрузить ещё" комментариев
const setButtonState = () => {
  if (showCommentsCount >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

//Создаёт и заполняет один комментарий информацией
const fillCommentElement = (element) => {
  const comment = socialCommentsItem.cloneNode(true); //Клонирует <li class="social__comment">
  const socialPictureAvatar = comment.querySelector('.social__picture');//<img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии">
  socialPictureAvatar.src = element.avatar; //Подставляет значения из create-comment в data.js
  socialPictureAvatar.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message; //<p class="social__text">Мега фото!</p>
  return comment;
};

//Рендерит список комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment(); //Добавит фрагмент
  const currentComments = comments.slice(showCommentsCount, showCommentsCount + COMMENTS_COUNTER); //Обрезает все комментарии с 0 по 5
  showCommentsCount = Math.min(showCommentsCount + COMMENTS_COUNTER, comments.length); //Показывает либо от 0 до 5, либо минимальное в длине если там меньше 5
  currentComments.forEach((comment) => fragment.append(fillCommentElement(comment))); //Обрезанный массив пропускает через цикл и добавляем во фрагмент каждый комментарий
  socialCommentsList.append(fragment); //Добавляет на страницу в DOM в <ul>
  setButtonState();
  fillCommentsCounter();
};

//Добавляет рендер комментариев
const onSocialCommentsLoaderClick = (evt) => {
  evt.preventDefault(evt);
  renderComments();
};

//Открытие окна с изображением
const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);
};

//Закрытие окна с изображением
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick); //Удаление обработчиков
  document.removeEventListener('keydown', onCloseButtonKeydown);
  socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
  showCommentsCount = 0; //Обнуление отображённых комментариев
};

//Удаляет обработчик по кнопке при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonKeydown (evt) {
  if (isEscapeEvent(evt) && !evt.target.closest('.social__footer-text')) { //<input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
    evt.preventDefault();
    closeBigPicture();
  }
}

//Удаляет обработчик по клику при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

//Добавляет информацию к большому изображению при открытии окна
const fillBigPictureImage = (data) => { //Заполняет одну картинку данными из thumbmail
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;
  socialCommentCaption.textContent = data.description;
  renderComments();
};

//Вывод
const showBigPictures = (data) => {
  socialCommentsList.innerHTML = ''; //Очищает спискок выводимых комментариев при каждом открытии изображения
  comments = data.comments;
  openBigPicture(); //Открывает окно с картинкой
  fillBigPictureImage(data); //Заполняет её данными
};

export { showBigPictures };
