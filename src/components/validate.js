//функции показать/закрыть ошибку
const showError = (input, errorMessage, settings) => {
  input.classList.add(settings.inputErrorClass);
  const errorId = `${input.id}-error`;
  const error = document.getElementById(errorId);
  if (error) {
    error.textContent = errorMessage;
  } else {
    console.error(`Error element with id '${errorId}' not found`);
  }
};

const hideError = (input, settings) => {
  input.classList.remove(settings.inputErrorClass);
  const errorId = `${input.id}-error`;
  const error = document.getElementById(errorId);
  error.textContent = "";
};
//функция сброса валидации
const resetValidation = (formElement, settings) => {
  formElement.reset();
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  inputList.forEach((input) => {
    hideError(input, settings);
  });
};
//функция блокировки кнопки
const disableButton = (button) => {
  button.disabled = true;
};

//функция разблокировки кнопки
const enableButton = (button) => {
  button.disabled = false;
};

//функция переключения ошибки
const checkField = (input, settings) => {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, settings);
  } else {
    hideError(input, settings);
  }
};

//функция переключения кнопки
const checkButton = (form, buttonSubmit) => {
  if (form.checkValidity()) {
    enableButton(buttonSubmit);
  } else {
    disableButton(buttonSubmit);
  }
};

const setEventListeners = (formElement, settings) => {
  const buttonSubmit = formElement.querySelector(settings.submitButtonSelector);
  checkButton(formElement, buttonSubmit);
  formElement.addEventListener("reset", () => {
    disableButton(buttonSubmit);
  });
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkField(input, settings);
      checkButton(formElement, buttonSubmit);
    });
  });
};
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    form.addEventListener("input", () => setEventListeners(form, settings));
  });
};

export { resetValidation, enableValidation, disableButton };
