const bigPicture = document.querySelector('.big-picture'); //line 139 <section class="big-picture overlay hidden">
const bigPictureImage = bigPicture.querySelector('.big-picture__img'); //<div class="big-picture__img">
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //line 181 <button class="big-picture__cancel cancel">

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const closeButtonOnDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) { //line 175 <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeButtonOnDocumentClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

closeButton.addEventListener('click', closeButtonOnDocumentClick);
document.addEventListener('keydown', closeButtonOnDocumentKeydown);

const showBigPictures = () => {
  openBigPicture();
};

export { showBigPictures };
