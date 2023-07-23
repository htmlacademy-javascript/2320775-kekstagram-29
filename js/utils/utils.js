const isEscapeEvent = (evt) => evt.key === 'Escape';

const getRandomInteger = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export { getRandomInteger, isEscapeEvent };
