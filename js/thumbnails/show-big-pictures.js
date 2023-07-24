import { isEscapeEvent } from '../utils/utils.js';

const COMMENTS_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsItem = bigPicture.querySelector('.social__comment');
const socialCommentCaption = bigPicture.querySelector('.social__caption');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

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

const fillCommentElement = (element) => {
  const comment = socialCommentsItem.cloneNode(true);
  const socialPictureAvatar = comment.querySelector('.social__picture');
  socialPictureAvatar.src = element.avatar;
  socialPictureAvatar.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  return comment;
};

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

//Объявляется декларативно для линтера
function onCloseButtonKeydown (evt) {
  if (isEscapeEvent(evt) && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
}

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
