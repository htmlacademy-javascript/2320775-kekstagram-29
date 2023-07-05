//1. Открытие-закрытие окна с картинкой
const bigPicture = document.querySelector('.big-picture'); //<section class="big-picture overlay hidden">
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //<button class="big-picture__cancel cancel">

//2. Добавление информации к окну с картинкой
const bigPictureImage = bigPicture.querySelector('.big-picture__img'); //<div class="big-picture__img">
const bigPictureSocial = bigPicture.querySelector('.big-picture__social'); //<div class="big-picture__social  social">
const likesCount = bigPicture.querySelector('.likes-count'); //<class="social__likes">Нравится <span class="likes-count">356</span>
const socialCommentsCount = bigPicture.querySelector('.comments-count'); //<div class="social__comment-count">5 из <span class="comments-count">125</span>комментариев</div>
const socialCommentsList = bigPicture.querySelector('.social__comments'); //<ul class="social__comments">
const socialCommentsLoader = bigPicture.querySelector('.comments-loader'); //<button type="button" class="social__comments-loader comments-loader">Загрузить еще</button>


const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const closeButtonOnDocumentKeydown = (evt) => { //Удаляет обработчик по кнопке при закрытии
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) { //line 175 <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeButtonOnDocumentClick = (evt) => { //Удаляет обработчик по клику при закрытии
  evt.preventDefault();
  closeBigPicture();
};

closeButton.addEventListener('click', closeButtonOnDocumentClick);
document.addEventListener('keydown', closeButtonOnDocumentKeydown);

const fillBigPictureImage = (data) => {
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
};

const showBigPictures = (data) => {
  openBigPicture();
  fillBigPictureImage(data);

};

export { showBigPictures };
