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
const ERROR_FORMAT_MESSAGE = 'Неверный формат файла';
const SUCCESS_BUTTON_MESSAGE = 'Круто!';
const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload input[type=file]');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const imgUploadSubmit = document.querySelector('.img-upload__submit');

//Предварительный просмотр изображения
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const onEffectListChange = (evt) => initEffects(evt.target.value);

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseButtonKeydown);
  effectsList.addEventListener('change', onEffectListChange);
  imgUploadCancelButton.addEventListener('click', onImgUploadCancelButtonClick);
};

const closeUploadForm = () => {
  imgUploadForm.reset();
  resetScale();
  resetPristine();
  initEffects(currentEffectValue);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydown);
  effectsList.removeEventListener('change', onEffectListChange);
  imgUploadCancelButton.removeEventListener('click', onImgUploadCancelButtonClick);
};

const onFileInputChange = (evt) => {
  const image = evt.target.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => imageName.endsWith(fileType));

  if (matches) {
    const fileUrl = URL.createObjectURL(image);
    imgUploadPreview.src = fileUrl;
    effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${fileUrl})`));
    openUploadForm();
    return;
  }

  showMessage(ERROR_FORMAT_MESSAGE, ERROR_CLASS);
};

const onUploadInputChange = (evt) => onFileInputChange(evt);

function onImgUploadCancelButtonClick (evt){
  evt.preventDefault();
  closeUploadForm();
}

function onCloseButtonKeydown (evt) {
  if (isEscapeEvent(evt) && !evt.target.closest('.text__description') && !evt.target.closest('.text__hashtags') && !document.querySelector('.error')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const setButtonState = (state) => (imgUploadSubmit.disabled = state);

const uploadSuccess = () => {
  setButtonState(false);
  closeUploadForm();
  showMessage(SUCCESS_MESSAGE, SUCCESS_CLASS, SUCCESS_BUTTON_MESSAGE);
};

const uploadError = () => {
  setButtonState(false);
  showMessage(ERROR_MESSAGE, ERROR_CLASS, ERROR_BUTTON_MESSAGE);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (validatePristine()) {
    setButtonState(true);
    sendData(SEND_URL, new FormData(evt.target), uploadSuccess, uploadError);
  }
};

const initUploadForm = () => {
  initValidation();
  initScale();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', onEffectListChange);
  imgUploadInput.addEventListener('change', onUploadInputChange);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { initUploadForm };
