let message;
let isOpen = false;

//Создаёт DOM-элемент со строкой ниже
const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessage = (type, text, buttonText) => (
  `<section class="${type}">
    <div class="${type}__inner">
      <h2 class="${type}__title">${text}</h2>
      ${buttonText ? `<button type="button" class="${type}__button">${buttonText}</button>` : ''}
    </div>
  </section>`
);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage() {
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);

  if(!isOpen) {
    document.body.classList.remove('modal-open');
  }
}

const showMessage = (type, text, buttonText) => {
  isOpen = false;
  message = createElement(createMessage(type, text, buttonText));
  document.body.append(message);

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      evt.preventDefault();
      closeMessage();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);

  if (buttonText) {
    message.querySelector(`.${type}__button`).addEventListener('click', closeMessage);
  }

  if(!document.body.classList.contains('modal-open')) { //Для того, чтобы убрать скролл под окном
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export { showMessage };
