//Универсальная функция
const getData = (url, onSuccess, onError) => { //принимает url и 2 колбэка
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch((error) => {
      onError(error);
    });
};

const sendData = (url, body, onSuccess, onError) => (
  fetch(url, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      onError();
    })
);

export { getData, sendData };
