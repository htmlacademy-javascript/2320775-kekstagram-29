/* Задание: функция проверки длины строки. Принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее.
*/

//if string <= maxLength return true
//if string > maxLength return false

const searchOfStringLength = (string, maxLength) => {
  const result = string.length <= maxLength;

  return result;
};

searchOfStringLength('проверяемая строка', 30);

/*
Задание: Функция для проверки, является ли строка палиндромом.
Cтрока reversedString:
1) удалить все пробелы
2) привести к нижнему регистру
3) разбить на массив символов
4) перевернуть массив
5) собрать массив
Строка string:
1) привести к такому же регистру
2) удалить все проблемы
Сравнить обе строки и вернуть результат в return
*/

function isPolindrome (string) {
  const reversedString = string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');
  return string.toLowerCase().replaceAll(' ', '') === reversedString;
}

isPolindrome('Нам рак влетел в карман');
isPolindrome('Коту тащат уток');
isPolindrome('Полиндром не полиндром');
