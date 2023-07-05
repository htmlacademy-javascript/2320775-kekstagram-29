const bigPicture = document.querySelector('.big-picture'); //<section class="big-picture overlay hidden">
const bigPictureImage = bigPicture.querySelector('.big-picture__img'); //<div class="big-picture__img">
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //<button class="big-picture__cancel cancel">


const openBigPicture = () => { //Открывает большое изображение
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onDocumentClick);
  document.addEventLictener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => { //закрывает большое изображение
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onDocumentClick);
  document.removeEventLictener('keydown', onDocumentKeydown);
};

const onDocumentClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const makeBigPicture = () => {
  openBigPicture();
  closeBigPicture();
};

export { makeBigPicture };
