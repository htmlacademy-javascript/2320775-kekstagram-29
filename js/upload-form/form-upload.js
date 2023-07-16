import { initScale, resetScale } from './scale-change.js';
import { initEffects, updateEffects } from './effects-overlay.js';
import { initValidation, validatePristine, resetPristine } from './form-validation.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');//<input type="file" id="upload-file" class="img-upload__input visually-hidden" name="filename" required> Загрузить
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //Форма редактирования изображения <div class="img-upload__overlay hidden">
const imgUploadCancelButton = document.querySelector('.img-upload__cancel'); //<button type="reset" class="img-upload__cancel cancel" id="upload-cancel">Закрыть</button>
const effectsList = document.querySelector('.effects__list'); //Блок "Наложение эффекта на изображение" список <ul class="effects__list">
const currentEffectValue = effectsList.querySelector('input:checked').value; //Находит value конкретного чекбокса

const onEffectListChange = (evt) => updateEffects(evt.target.value); //Запускается когда меняется значение чекбокса

//Открывает форму загрузки изображения
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseButtonKeydown); //Добавляет обработчик события
};

//Закрывает форму загрузки изображения
const closeUploadForm = () => {
  imgUploadForm.reset();
  resetScale();
  resetPristine(); //Сброс полей формы
  updateEffects(currentEffectValue); //Сброс до дефолтных значений чекбокса
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydown); //Удаляет обработчик события
};

const onImgUploadInputChange = () => openUploadForm();
const onImgUploadCancelButtonClick = () => closeUploadForm();
const onUploadFormSubmit = (evt) => {
  if (!validatePristine()) {
    evt.preventDefault();
  }
};

function onCloseButtonKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.text__description') && !evt.target.closest('.text__hashtags')) {//Исключает поля ввода комментов и хэштегов при нажатии esc
    evt.preventDefault();
    closeUploadForm();
  }
}

//Вывод
const initUploadForm = () => {
  initValidation();
  initScale();
  initEffects(currentEffectValue); //Передаёт чекнутый чекбокс
  effectsList.addEventListener('change', onEffectListChange);
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);
  imgUploadCancelButton.addEventListener('click', onImgUploadCancelButtonClick);
};

export { initUploadForm };
