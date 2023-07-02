const picturesContainer = document.querySelector('.pictures'); //Находит тег с классом в разметке (DOM-element)
const templateFragment = document.querySelector('#picture').content.querySelector('.picture'); //Находит шаблон по id и через content его содержимое

//1. Создание DOM-элемента
//2. Наполнение шаблона данными
const makeOneThumbnail = ({ comments, description, likes, url }) => { //Метод деструктуризации массива для 4х переменных

  const thumbnail = templateFragment.cloneNode(true); //Клонирует содержимого шаблона
  thumbnail.querySelector('.picture__img').src = url; //Использует точечную нотацию для обращения к свойству
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length; //Указывает количество комментариев
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

//3. Функция для отрисовки созданных элементов
const getAllThumbnails = (pictures) => { //Принмает массив pictures
  const fragment = document.createDocumentFragment(); //Создаёт временное хранилище для элементов
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const thumbnail = makeOneThumbnail(picture); //Создаёт одноин DOM-элемент
    fragment.append(thumbnail); //Добавляет элемент в переменную хранилища
    picturesContainer.append(fragment); //Добавляет созданный массив в DOM-дерево
  }
  return fragment;
};

export {getAllThumbnails};
