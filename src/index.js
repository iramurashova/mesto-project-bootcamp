import "./pages/index.css";
import {
  resetValidation,
  enableValidation,
  disableButton,
} from "./components/validate";
import { showPopup, closePopup } from "./components/modal";
import  createElement  from "./components/card";
import { addElement } from "./components/utils";
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector('.profile__overlay');
const editButton = profile.querySelector(".profile__edit");
const addButton = profile.querySelector(".profile__add");
const popups = Array.from(document.getElementsByClassName("popup"));
const popupEditProfile = document.getElementById("edit-profile");
const popupOpenPhoto = document.getElementById("open-image");
const image = popupOpenPhoto.querySelector(".popup__image");
const caption = popupOpenPhoto.querySelector(".popup__caption");
const popupAddCard = document.getElementById("add-card");
const popupEditProfilePhoto = document.getElementById('edit-profile_photo');
const popupFormEdit = document.forms.profile;
const popupFormEditPhoto = document.forms.profile_photo;
const popupFormAdd = document.forms.card;
const nameFormEdit = popupFormEdit.elements.name;
const descriptionFormEdit = popupFormEdit.elements.about;
const nameFormAdd = popupFormAdd.elements.name;
const linkFormAdd = popupFormAdd.elements.link;
const linkFormEditProfilePhoto = popupFormEditPhoto.elements.link;
const elements = document.querySelector(".elements__list");
const cardSettings = {
  imageSelector: ".element__image",
  titleSelector: ".element__title",
  likeButtonSelector: ".element__like",
  deleteButtonSelector: ".element__delete",
};
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const template = document.getElementById("card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);

//объект для валидации формы
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input_type_error",
};



//цикл добавления элементоа
initialCards.forEach((el) => {
  const newItem = createElement(
    el,
    cardTemplate,
    handlePopupOpenPhoto,
    cardSettings
  );
  addElement(elements, newItem, "append");
});

function handlePopupOpenPhoto(link, name) {
  showPopup(popupOpenPhoto);
  image.src = link;
  image.alt = name;
  caption.textContent = name;
}

//функция обработки сохранения попапа формы редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const name = nameFormEdit.value;
  const description = descriptionFormEdit.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEditProfile);
}

//функция обработки сохранения попапа формы добавления
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const el = {
    name: String(nameFormAdd.value),
    link: String(linkFormAdd.value),
  };
  const newEl = createElement(el, cardTemplate, handlePopupOpenPhoto, cardSettings);
  console.log(newEl);
  addElement(elements, newEl, "prepend");
  evt.target.reset();
  closePopup(popupAddCard);
}

editButton.addEventListener("click", () => {
  showPopup(popupEditProfile);
  resetValidation(popupFormEdit,validationSettings);
  nameFormEdit.value = profileName.textContent;
  descriptionFormEdit.value = profileDescription.textContent;

});

addButton.addEventListener("click", () => {
  showPopup(popupAddCard);
  resetValidation(popupFormAdd,validationSettings);
  disableButton(popupFormAdd.elements.save);
});

profileAvatar.addEventListener("click", ()=> {
  showPopup(popupEditProfilePhoto);
  resetValidation(popupFormEditPhoto,validationSettings);
  disableButton(popupFormEditPhoto.elements.save);
})
enableValidation(validationSettings);



popupFormEdit.addEventListener("submit", handleFormEditSubmit);
popupFormAdd.addEventListener("submit", handleFormAddSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
  }
  if (evt.target.classList.contains('popup__close')) {
    closePopup(popup)
  }
  });
});
