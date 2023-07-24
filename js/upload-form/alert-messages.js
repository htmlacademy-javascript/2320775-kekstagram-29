import { isEscapeEvent } from '../utils/utils.js';

let message;
let isOpen = false;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessage = (text, type, buttonText) => (
  `<section class="${type}">
    <div class="${type}__inner">
      <h2 class="${type}__title">${text}</h2>
      ${buttonText ? `<button type="button" class="${type}__button">${buttonText}</button>` : ''}
    </div>
  </section>`
);

const onDocumentKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    closeMessage();
  }
};

const onCloseButtonClick = () => closeMessage();

//Линтер
function closeMessage() {
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);

  if(!isOpen) {
    document.body.classList.remove('modal-open');
  }
}

const showMessage = (text, type, buttonText) => {
  isOpen = false;
  message = createElement(createMessage(text, type, buttonText));
  document.body.append(message);

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      evt.preventDefault();
      closeMessage();
    }
  });

  if (buttonText) {
    message.querySelector(`.${type}__button`).addEventListener('click', onCloseButtonClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);

  if(!document.body.classList.contains('modal-open')) { //Для того, чтобы убрать скролл под модальным окном
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export { showMessage };
