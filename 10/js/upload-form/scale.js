const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DIVIDER = 100; //Убирает "магическое" число

//Изменение размера изображения
const scaleControlSmaller = document.querySelector('.scale__control--smaller'); //<button type="button" class="scale__control scale__control--smaller">Уменьшить</button>
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value'); ////Элемент в форме, который отображает текущее значение масштабирования в процентах
const imgUploadPreview = document.querySelector('.img-upload__preview img'); //Предварительный просмотр изображения <div class="img-upload__preview"><img alt="Предварительный просмотр фотографии">

let currentScale = MAX_SCALE;

//Изменяет свойство transform: scale элемента .img-upload__preview
const changeScale = (value) => {
  imgUploadPreview.style.transform = `scale(${value / DIVIDER})`; //Значение делит на 100, чтобы получить значение например 0.25
  scaleControlValue.value = `${value}%`; //Задает свойству элемента .scale__control--value значение в процентах
};

const onScaleControlSmallerClick = (evt) => {
  evt.preventDefault();
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

const onScaleControlBiggerClick = (evt) => {
  evt.preventDefault();
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale(MAX_SCALE);
};

export { initScale, resetScale };
