/* Наложение эффекта на изображение.
Using noUiSlider libruary.
<input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-none" value="none" checked>
<label for="effect-none" class="effects__label"> */

//В объекте наименования ключей соответствуют значению 'value' чекбоксов 'radio' в рзметке.
const EFFECTS = {
  original: {
    filter: 'none', //Для эффекта «Оригинал» CSS-стили filter удаляются
    min: 1,
    max: 1,
    step: 1,
    unit: '',
  },
  chrome: { //<input type="radio" class="effects__radio id="effect-chrome" value="chrome"><label for="effect-chrome">
    filter: 'grayscale', //Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia', //filter: sepia(0..1) с шагом 0.1;
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert', //filter: invert(0..100%) с шагом 1%;
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur', //filter: blur(0..3px) с шагом 0.1px;
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness', //filter: brightness(1..3) с шагом 0.1;
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imgUploadPreview = document.querySelector('.img-upload__preview img'); //Предварительный просмотр изображения <div class="img-upload__preview"><img src="img/upload-default-image.jpg"
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); //Cлайдер и его контейнер <fieldset class="img-upload__effect-level">
const effectLevelValue = document.querySelector('.effect-level__value'); //<input class="effect-level__value" type="number" step="any" name="effect-level" value="">
const effectLevelSlider = document.querySelector('.effect-level__slider'); //<div class="effect-level__slider"> в fildsete <fieldset class="img-upload__effect-level">

const updateSliderHandler = (filter, unit) => { //Принимает имя эффекта и юнит
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.off('update');
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${filter}(${value}${unit})`; //Шаблонная строка добавляет атрибут style диву .img-upload__preview, напр. style="filter: invert(34%)"
    effectLevelValue.value = value; //Берёт значение из noUiSlider-ползунка и записывает в див, так как input скрыт
  });
};

const setContainerState = (value) => {
  if (value === 'none') {
    imgUploadEffectLevel.classList.add('hidden'); //Скрывает ползунок и его контейнер, если value none, выбран эффект original
    imgUploadPreview.style.filter = 'none';
    return;
  }
  imgUploadEffectLevel.classList.remove('hidden');
};

//Инициализация слайдера
const initEffects = (value) => { //Получает value чекнутого чекбокса
  const { filter, min, max, step, unit } = EFFECTS[value] || EFFECTS.original; //Ищет эффект

  setContainerState(value);

  noUiSlider.create(effectLevelSlider, { //Создаёт слайдер на основе дива из разметки
    range: { //Настройки берёт из объекта
      min,
      max,
    },
    step,
    start: max,
    connect: 'lower',
  });


  updateSliderHandler(filter, unit);
};

//Обновление эффектов слайдера
const updateEffects = (value) => {
  setContainerState(value);

  if (value === 'none') {
    return;
  }

  const { filter, min, max, step, unit } = EFFECTS[value] || EFFECTS.original;

  effectLevelSlider.noUiSlider.updateOptions({
    range: { //Настройки берёт из объекта
      min,
      max,
    },
    step,
    start: max,
  });

  updateSliderHandler(filter, unit);

};

export { initEffects, updateEffects };
