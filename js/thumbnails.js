const picturesContainer = document.querySelector('.pictures'); //Найти тег с классом в разметке (DOM-element)
const templateFragment = document.querySelector('#picture').content.querySelector('.picture'); //Найти шаблон по id и через content его содержимое

//1. Создание DOM-элемента
//2. Наполнение шаблона данными
const createThumbnail = ({ comments, description, likes, url }) => { //деструктуризация массива для 4 переменных
  const thumbnail = templateFragment.cloneNode(true); //Клонирование содержимого шаблона
  thumbnail.querySelector('.picture__img').src = url; //Использование точечной нотации для обращения к свойству
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length; //Указать количество комментариев
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

//3. Функция для отрисовки созданных элементов

const drawThumbnails = (pictures) => { //Принмает массив pictures
  const fragment = document.createDocumentFragment(); //Создание временного хранилища для эолементов
  pictures.forEach((picture) => { //Цикл перебора данных массива
    const thumbnail = createThumbnail(picture); //Создание одного DOM-элемента
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment); //Добавляет созданный массив в DOM-дерево
};

export {drawThumbnails};
