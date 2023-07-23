const EFFECTS = {
  original: {
    filter: 'none',
    min: 1,
    max: 1,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const setContainerState = (value) => {
  if (value === 'none' || !value) {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
    return;
  }
  imgUploadEffectLevel.classList.remove('hidden');
};

//Создаёт слайдер
const createSlider = (data) => {
  const { filter, min, max, step, unit } = EFFECTS[data] || EFFECTS.original;
  setContainerState(data);
  noUiSlider.create(effectLevelSlider, {
    range: {
      min,
      max,
    },
    step,
    start: max,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${filter}(${value}${unit})`;
    effectLevelValue.value = value;
  });
};

//Инициализация эффектов слайдера
const initEffects = (data) => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  createSlider(data);
};

export { initEffects };
