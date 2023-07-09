//Модуль для вспомогательных функций и их экспорта в data.js

//Функция для генерации случайного числа.
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для генерации случайного элемента массива.
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//Функция для создания счётчика
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export { getRandomInteger, getRandomArrayElement, createIdGenerator };
