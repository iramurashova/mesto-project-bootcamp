import { closePopup } from "./modal";

//функция добавления элемента
const addElement = (elements, el, method) => {
  elements[method](el);
};

const renderLoading = (
  isLoading,
  button,
  loadingText = "Сохранение..."
) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = button.ariaLabel;
  }
};

 const handleSubmit = (request, evt, loadingText = "Сохранение...") => {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      closePopup(evt.target.closest('.popup'));
    })
    .catch(console.error)
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

export {addElement, renderLoading, handleSubmit}
