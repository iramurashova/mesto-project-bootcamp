const cardSettings = {
    imageSelector: ".element__image",
    titleSelector: ".element__title",
    likeButtonSelector: ".element__like",
    likeCountSelector: ".element__like-count",
    deleteButtonSelector: ".element__delete",
  };
  //объект для валидации формы
  const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inputErrorClass: "popup__input_type_error",
  };

  export {cardSettings, validationSettings}