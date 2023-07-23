
const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i; //Регулярное выражение для проверки строки

const CHECK_COMMENT_LENGTH = `Комментарий не может быть больше ${COMMENT_MAX_LENGTH} символов.`;
const CHECK_HASHTAGS_VALIDITY = 'Используйте валидный хэштег из букв/чисел, без пробелов/спецсимволов, и не более 19 знаков длиной.';
const CHECK_HASHTAGS_COUNT = 'Нельзя указать более пяти хэштегов.';
const CHECK_DOUBLE_HASHTAGS = 'Один и тот же хэштег не может быть использован дважды.';

const imgUploadForm = document.querySelector('.img-upload__form'); //<form class="img-upload__form"
const textHashtags = document.querySelector('.text__hashtags'); //Поле для хэштега
const textDescription = document.querySelector('.text__description'); //Поле для комментария <textarea class="text__description"

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper', //Вешается на обе обёртки полей <div class="img-upload__field-wrapper">
  errorTextParent: 'img-upload__field-wrapper' //Куда выводится сообщение об ошибке
});

const checktextDescriptionLength = (value) => value.length <= COMMENT_MAX_LENGTH; //Возвращает true or false
const createHachtags = (value) => value.trim().toLowerCase().split(' ');
//Обрезает пробелы тримом, приводит к нижнему регистру, сплитом создаёт массив

const checkHashtagsValidity = (value) => { //Проверяет хэштеги на валидность
  if (!value) {
    return true;
  }

  const hashtags = createHachtags(value);
  return hashtags.every((element) => HASHTAG_REGEXP.test(element));
  //Перебирает массив hashtags, и првоерят, что каждый из элементов массива element соответствует регулярному выражению.
};

const checkHashtagsCount = (value) => { //Сравнивает длину массива с заданным значением
  const hashtags = createHachtags(value);
  return hashtags.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagsDouble = (value) => { //Проверяет хэштеги на уникальность
  const hashtags = createHachtags(value); //Создаёт массив hashtags (принял, например, 2 одинаковых # от пользователя)
  return hashtags.length === new Set(hashtags).size;
  //Помещает хэштеги в set, set удаляет одинаковые значения, остаётся 1, и если массив из 2 одинаковых #, то set возвращает false
};

const validatePristine = () => pristine.validate(); //Использует метод библиотеки validate()
const resetPristine = () => pristine.reset(); //Использует метод библиотеки reset()

//Вывод валидатора (исп. 5 параметров: поле, колбэк проверки, текст ошибки, приоритет, прерывание)
const initValidation = () => {
  pristine.addValidator(textDescription, checktextDescriptionLength, CHECK_COMMENT_LENGTH, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsValidity, CHECK_HASHTAGS_VALIDITY, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsCount, CHECK_HASHTAGS_COUNT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsDouble, CHECK_DOUBLE_HASHTAGS, 1, true);
};

export { initValidation, validatePristine, resetPristine };
