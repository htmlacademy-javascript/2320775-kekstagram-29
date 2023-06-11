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
Переменная reversedString:
1) удалить все пробелы
2) привести к нижнему регистру
3) разбить на массив символов
4) перевернуть массив
5) собрать массив
Параметр string:
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

/*
Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры,
функция должна вернуть NaN:
имяФункции('2023 год');            // 2023
имяФункции('ECMAScript 2022');     // 2022
имяФункции('1 кефир, 0.5 батона'); // 105
имяФункции('агент 007');           // 7
имяФункции('а я томат');           // NaN
*/

const stringToNumber = (string) => {
  const symbols = string.match(/\d/g); //ищет цифы и возвращает массив совпадений. Цифра (`\d`), флаг `g`(поиск всех совпадений).
  if (!symbols) {
    return NaN;
  }
  const parsed = parseInt(symbols.join(''), 10); //объединение массива в строку join и преобразование в целое числов parseInt
  return parsed;
};

stringToNumber('2023 год');
stringToNumber('ECMAScript 2022');
stringToNumber('1 кефир, 0.5 батона');
stringToNumber('агент 007');
stringToNumber('а я томат');
stringToNumber('2023');
