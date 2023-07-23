import { isEscapeEvent } from '../utils/utils.js';
import { initScale, resetScale } from './scale-change.js';
import { initEffects } from './effects-overlay.js';
import { sendData } from '../utils/api.js';
import { showMessage } from './alert-messages.js';
import { initValidation, validatePristine, resetPristine } from './form-validation.js';

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';
const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const ERROR_MESSAGE = 'Ошибка загрузки файла';
const ERROR_BUTTON_MESSAGE = 'Попробовать ещё раз';
const ERROR_FORMAT = 'Неверный формат файла';
const SUCCESS_BUTTON_MESSAGE = 'Круто!';
const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload input[type=file]');//<input type="file" id="upload-file" class="img-upload__input visually-hidden" name="filename" required> Загрузить
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //Форма редактирования изображения <div class="img-upload__overlay hidden">
const imgUploadCancelButton = document.querySelector('.img-upload__cancel'); //<button type="reset" class="img-upload__cancel cancel" id="upload-cancel">Закрыть</button>
const effectsList = document.querySelector('.effects__list'); //Блок "Наложение эффекта на изображение" список <ul class="effects__list">
const currentEffectValue = effectsList.querySelector('input:checked').value; //Находит value конкретного чекбокса
const imgUploadSubmit = document.querySelector('.img-upload__submit');

//Предварительный просмотр изображения
const imgUploadPreview = document.querySelector('.img-upload__preview img'); // <div class="img-upload__preview">
const effectsPreview = document.querySelectorAll('.effects__preview'); //<span class="effects__preview

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

//Тут магия какая-то
const onFileInputChange = (evt) => {
  const image = evt.target.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => imageName.endsWith(fileType));//Провярет сопадения окончаний

  if (matches) {
    const fileUrl = URL.createObjectURL(image);
    imgUploadPreview.src = fileUrl;
    effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${fileUrl})`));
    openUploadForm();
    return;
  }

  showMessage(ERROR_FORMAT, ERROR_CLASS);
};

const onUploadInputChange = (evt) => onFileInputChange(evt);

function onImgUploadCancelButtonClick (evt){
  evt.preventDefault();
  closeUploadForm();
}

function onCloseButtonKeydown (evt) {
  if (isEscapeEvent(evt) && !evt.target.closest('.text__description') && !evt.target.closest('.text__hashtags')) {//Исключает поля ввода комментов и хэштегов при нажатии esc
    evt.preventDefault();
    closeUploadForm();
  }
}

const setButtonState = (state) => {
  imgUploadSubmit.disabled = state;
};

//Передаёт сообщение об успехе
const uploadSuccess = () => {
  setButtonState(false);
  closeUploadForm();
  showMessage(SUCCESS_MESSAGE, SUCCESS_CLASS, SUCCESS_BUTTON_MESSAGE);
};

//Передаёт сообщение об ошибке
const uploadError = () => {
  setButtonState(false);
  showMessage(ERROR_MESSAGE, ERROR_CLASS, ERROR_BUTTON_MESSAGE);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (validatePristine()) {
    setButtonState(true);
    const formData = new FormData(evt.target);
    sendData(SEND_URL, formData, uploadSuccess, uploadError);
  }
};

//Вывод
const initUploadForm = () => {
  initValidation();
  initScale();
  initEffects(currentEffectValue); //Передаёт чекнутый чекбокс
  effectsList.addEventListener('change', onEffectListChange);
  imgUploadInput.addEventListener('change', onUploadInputChange);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { initUploadForm };
