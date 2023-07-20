const createMessage = (type, text, buttonState) => (
  `<section class="${type}">
    <div class="${type}__inner">
      <h2 class="${type}__title">${text}</h2>
      ${buttonState ? `<button type="button" class="${type}__button">Попробовать ещё раз</button>` : ''}
    </div>
  </section>`
);

const showMessage = (messageType, messageText, btnState) => {
  let message = createMessage(messageType, messageText, btnState);
  document.body.insertAdjacentHTML('beforeend', message);

  message = document.querySelector(`.${messageType}`);
  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${messageType}__inner`)) {
      evt.preventDefault();
      message.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      evt.preventDefault();
      message.remove();
    }
  }, {capture: true, once: true});
  if (btnState) {
    const messageButton = message.querySelector(`.${messageType}__button`);
    messageButton.addEventListener('click', () => message.remove());
  }
};

export { showMessage };
