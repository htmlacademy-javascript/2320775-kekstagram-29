/*
Напишите функцию, которая принимает время начала и конца рабочего дня,
а также время старта и продолжительность встречи в минутах и возвращает
true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
*/

/* Функция для преобразования время в минуты.
1. Функция принимает строку типа "08:05"
2. Из строки создаётся массив из двух частей (часы и минуты), разделённый :
3. Методом map элементы массива приводится к числу
4. Возвращаем количество минут в строке
*/
const getTimeInMinutes = (stringTime) => {
  const [hours, minutes] = stringTime.split(':').map(Number);
  return hours * 60 + minutes;
};

/* Функция для вычисления времени встречи относительно окончания раб.дня
1. Принимает значения: начала и окончания раб.дня, начала встречи, продолжительности встречи в минутах
2. Заводится переменная окончания встречи = началу встречи в минутах + продолжительности встречи
3. Заводится переменная сверхурочных = окончание раб.дня в минутах
4. Проверка условия: если время окончания встречи <= сверхурочным И начало встречи в минутах >= началу раб.дня,
вернуть true. Иначе вернуть false.
*/
const isMeetingInWorkingHours = (startTime, endTime, meetingStart, meetingStartInMinutes) => {
  const meetingEnd = getTimeInMinutes(meetingStart) + meetingStartInMinutes;
  const overTime = getTimeInMinutes(endTime);

  if (meetingEnd <= overTime && getTimeInMinutes(meetingStart) >= getTimeInMinutes(startTime)) {
    return true;
  }
  return false;
};

isMeetingInWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkingHours('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkingHours('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkingHours('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkingHours('8:00', '17:30', '08:00', 900); // false
