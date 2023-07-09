//1. Открытие-закрытие окна с картинкой
const bigPicture = document.querySelector('.big-picture'); //<section class="big-picture overlay hidden">
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //<button type="reset" class="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button>

//2. Добавление информации к большой картинке при открытии окна
const bigPictureImage = bigPicture.querySelector('.big-picture__img img'); //<div class="big-picture__img">
const likesCount = bigPicture.querySelector('.likes-count'); //<class="social__likes">Нравится <span class="likes-count">356</span>
const socialCommentsList = bigPicture.querySelector('.social__comments'); //<ul class="social__comments">
const socialCommentsItem = bigPicture.querySelector('.social__comment'); //<li class="social__comment">
const socialCommentCaption = bigPicture.querySelector('.social__caption'); //<p class="social__caption">Тестим новую камеру! =)</p>

//1. Открытие-закрытие окна с картинкой
const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
};

//Удаляет обработчик по кнопке при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) { //<input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
    evt.preventDefault();
    closeBigPicture();
  }
}

//Удаляет обработчик по клику при закрытии. Объявляется декларативно для обхода линтера
function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

//2. Добавление информации к большой картинке при открытии окна
const fillBigPictureImage = (data) => { //Заполняет одну картинку данными из thumbmail
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;
  socialCommentCaption.textContent = data.description;
};

const fillCommentElement = (element) => { //Получает 1 комментарий и заполняет картинку (из create-comment в data.js)
  const comment = socialCommentsItem.cloneNode(true);
  const socialPictureAvatar = comment.querySelector('.social__picture');//<img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии">
  socialPictureAvatar.src = element.avatar;
  socialPictureAvatar.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message; //<p class="social__text">Мега фото!</p>
  return comment;
};

const fillCommentsList = (data) => { //Перебирает массив объектов с комментариями
  data.forEach((element) => socialCommentsList.append(fillCommentElement(element))); //заполняет список комментов UL элементами LI с описанием
};

//Вывод
const showBigPictures = (data) => {
  socialCommentsList.innerHTML = ''; //Очищает спискок выводимых комментариев при каждом открытии
  openBigPicture(); //Открывает окно с картинкой
  fillBigPictureImage(data); //Заполняет её данными
  fillCommentsList(data.comments); //Заполняет комментариями
};

export { showBigPictures };
