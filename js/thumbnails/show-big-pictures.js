import { isEscapeEvent } from '../utils/utils.js';

const COMMENTS_COUNTER = 5;

//Открытие-закрытие окна с изображением
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

//Добавление информации к большому изображению при открытии окна
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsItem = bigPicture.querySelector('.social__comment'); //<li class="social__comment">
const socialCommentCaption = bigPicture.querySelector('.social__caption'); //<p class="social__caption">Тестим новую камеру! =)</p>
const socialCommentsLoader = bigPicture.querySelector('.comments-loader'); //<button type="button" class="social__comments-loader comments-loader">Загрузить еще</button>
const socialCommentsCount = bigPicture.querySelector('.social__comment-count'); //<div class="social__comment-count">5 из <span class="comments-count">125</span> комментариев</div>

let showCommentsCount = 0;
let comments;

const fillCommentsCounter = () => {
  socialCommentsCount.innerHTML = `${showCommentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const setButtonState = () => {
  if (showCommentsCount >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

//Создаёт и заполняет один комментарий информацией
const fillCommentElement = (element) => {
  const comment = socialCommentsItem.cloneNode(true);
  const socialPictureAvatar = comment.querySelector('.social__picture');
  socialPictureAvatar.src = element.avatar;
  socialPictureAvatar.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  return comment;
};

//Рендерит список комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(showCommentsCount, showCommentsCount + COMMENTS_COUNTER);
  showCommentsCount = Math.min(showCommentsCount + COMMENTS_COUNTER, comments.length);
  currentComments.forEach((comment) => fragment.append(fillCommentElement(comment)));
  socialCommentsList.append(fragment);
  setButtonState();
  fillCommentsCounter();
};

const onSocialCommentsLoaderClick = (evt) => {
  evt.preventDefault(evt);
  renderComments();
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
  showCommentsCount = 0; //Обнуление отображённых комментариев
};

//Удаляет обработчик по кнопке при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonKeydown (evt) {
  if (isEscapeEvent(evt) && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
}

//Удаляет обработчик по клику при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

const fillBigPictureImage = (data) => {
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;
  socialCommentCaption.textContent = data.description;
  renderComments();
};

const showBigPictures = (data) => {
  socialCommentsList.innerHTML = '';
  comments = data.comments;
  openBigPicture();
  fillBigPictureImage(data);
};

export { showBigPictures };
