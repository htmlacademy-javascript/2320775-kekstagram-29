const HASHTAG_MAX_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const CHECK_HASHTAGS_VALIDITY = 'Хэштеги должны состоять из букв/чисел длиной не более 20 знаков, разделённые одним пробелом, без спецсимволов';
const CHECK_HASHTAGS_COUNT = 'Нельзя указывать более пяти хэштегов';
const CHECK_DOUBLE_HASHTAGS = 'Один и тот же хэштег не может быть использован дважды';

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const createHashtags = (value) => value.trim().toLowerCase().split(' ');

const checkHashtagsValidity = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = createHashtags(value);
  return hashtags.every((element) => HASHTAG_REGEXP.test(element));
};

const checkHashtagsCount = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagsDouble = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

const initValidation = () => {
  pristine.addValidator(textHashtags, checkHashtagsValidity, CHECK_HASHTAGS_VALIDITY, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsCount, CHECK_HASHTAGS_COUNT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsDouble, CHECK_DOUBLE_HASHTAGS, 1, true);
};

export { initValidation, validatePristine, resetPristine };
