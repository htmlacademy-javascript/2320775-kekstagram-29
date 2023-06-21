/*
Создать массив из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, опубликованной пользователем.
Структура:
- id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
- url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
- description, строка — описание фотографии.
- likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
- comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.
Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
*/

const LIKES_MIN = 15;
const LIKES_MAX = 200;
const PICTURE_NUMBER = 25;
const AVATAR_NUMBER = 6;
const COMMENT_NUMBER = 30;

const NAMES = ['Облачко', 'Рыжуля', 'Тигра', 'Дымок', 'Барсик', 'Уголёк', 'Черныш', 'Батон', 'Булочка', 'Персик'];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Вот как выглядит пустой пляж зимой - солнце, лежаки и никого',
  'Деревянный указатель "На пляж", выполнен, похоже, в пиратском стиле.',
  'Голубая вода, голубое небо, всегда тепло и ясно - что ещё надо?',
  'Какие красивые глаза у неё...',
  'А бармен - шутник, однако!',
  'Кто-то съел мой завтрак.',
  'Юпи вернулся!',
  'Заберите нас отсюда!',
  'Интересная конструкция. Надо купить домой такую.',
  'И здесь одни заборы?((',
];

//Функция для генерации случайного числа.
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для генерации случайного элемента массива.
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//Функция для генерации id
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();
const generatePictureId = createIdGenerator();

//Функция для генерации сообщения.
//Создаётся массив длиной из 1-2 случайных элементов массива comments
//и склеивается методом join
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENTS),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_NUMBER)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

//Функция для генерации объекта-фотографии.
const createPicture = () => {
  const id = generatePictureId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from(
      { length: getRandomInteger(0, COMMENT_NUMBER) },
      createComment,
    ),
  };
};

//Функция для возвращения массива фотографий
//принимает 2 аргумента: массивоподобный объект и функцию createPicture
const getPictures = () => Array.from(
  { length: PICTURE_NUMBER },
  createPicture,
);

getPictures();
