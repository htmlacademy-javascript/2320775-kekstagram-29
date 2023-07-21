import { initScale, resetScale } from './scale-change.js';
import { initEffects } from './effects-overlay.js';
import { sendData } from '../utils/api.js';
import { showMessage } from './alert-messages.js';
import { initValidation, validatePristine, resetPristine } from './form-validation.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');//<input type="file" id="upload-file" class="img-upload__input visually-hidden" name="filename" required> Загрузить
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //Форма редактирования изображения <div class="img-upload__overlay hidden">
const imgUploadCancelButton = document.querySelector('.img-upload__cancel'); //<button type="reset" class="img-upload__cancel cancel" id="upload-cancel">Закрыть</button>
const effectsList = document.querySelector('.effects__list'); //Блок "Наложение эффекта на изображение" список <ul class="effects__list">
const currentEffectValue = effectsList.querySelector('input:checked').value; //Находит value конкретного чекбокса
const imgUploadSubmit = document.querySelector('.img-upload__submit');

//Предварительный просмотр изображения
const imgUploadPreview = document.querySelector('.img-upload__preview img'); // <div class="img-upload__preview">
const effectsPreview = document.querySelector('.effects__preview'); //<span class="effects__preview

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const ERROR_MESSAGE = 'Ошибка загрузки файла';
const ERROR_BUTTON_MESSAGE = 'Попробовать снова';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onEffectListChange = (evt) => {
  initEffects(evt.target.value); //Запускает когда меняется значение чекбокса
};

//Открывает форму загрузки изображения
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseButtonKeydown); //Добавляет обработчик события
  effectsList.addEventListener('change', onEffectListChange);
  imgUploadCancelButton.addEventListener('click', onImgUploadCancelButtonClick);
};

//Закрывает форму загрузки изображения
const closeUploadForm = () => {
  imgUploadForm.reset();
  resetScale();
  resetPristine(); //Сброс полей формы
  initEffects(currentEffectValue); //Сброс до дефолтных значений чекбокса
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydown); //Удаляет обработчик события
  effectsList.removeEventListener('change', onEffectListChange);
  imgUploadCancelButton.removeEventListener('click', onImgUploadCancelButtonClick);
};

function onImgUploadCancelButtonClick (evt){
  evt.preventDefault();
  closeUploadForm();
}

function onCloseButtonKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.text__description') && !evt.target.closest('.text__hashtags')) {//Исключает поля ввода комментов и хэштегов при нажатии esc
    evt.preventDefault();
    closeUploadForm();
  }
}

//Передаёт сообщение об успехе
const successUpload = () => {
  closeUploadForm();
  showMessage('success', SUCCESS_MESSAGE);
};

//Передаёт сообщение об ошибке
const errorUpload = () => {
  showMessage('error', ERROR_MESSAGE, ERROR_BUTTON_MESSAGE);
};

async function onUploadFormSubmitClick(evt) {
  evt.preventDefault();

  if (validatePristine()) {
    imgUploadSubmit.disabled = true;
    await sendData(SEND_URL, new FormData(evt.target), successUpload, errorUpload); //Принимает url, тело формы, два колбэка ошибки успеха и ошибки
    imgUploadSubmit.disabled = false;
  }
}

//Проверяет валидность загружаемого файла c изображением
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

//Тут магия какая-то
const onFileInputChange = (evt) => {
  const file = URL.createObjectURL(evt.target.files[0]);
  imgUploadPreview.src = file;
  effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${file})`));
};

const onImgUploadInputChange = (evt) => {
  if (isValidType) {
    openUploadForm();
    onFileInputChange(evt);
  }
};

//Вывод
const initUploadForm = () => {
  initValidation();
  initScale();
  initEffects(currentEffectValue); //Передаёт чекнутый чекбокс
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadForm.addEventListener('submit', onUploadFormSubmitClick);
};

export { initUploadForm };
