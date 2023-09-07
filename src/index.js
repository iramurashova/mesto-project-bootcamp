import "./pages/index.css";
import {
  resetValidation,
  enableValidation,
  disableButton,
} from "./components/validate";
import { showPopup, closePopup } from "./components/modal";
import { createElement, handleDeletePopup } from "./components/card";
import { addElement } from "./components/utils";
import {
  getInitialCards,
  getProfileInfo,
  patchProfileAvatar,
  patchProfileInfo,
  saveNewCard
} from "./components/api";
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__avatar");
const editButton = profile.querySelector(".profile__edit");
const addButton = profile.querySelector(".profile__add");
const popups = Array.from(document.getElementsByClassName("popup"));
const element = document.querySelector(".element");
const popupEditProfile = document.getElementById("edit-profile");
const popupOpenPhoto = document.getElementById("open-image");
export const popupDeleteCard = document.getElementById("delete-card");
const image = popupOpenPhoto.querySelector(".popup__image");
const caption = popupOpenPhoto.querySelector(".popup__caption");
const popupAddCard = document.getElementById("add-card");
const popupEditProfilePhoto = document.getElementById("edit-profile_photo");
const popupFormEdit = document.forms.profile;
const popupFormEditPhoto = document.forms.profile_photo;
const popupFormAdd = document.forms.card;
const nameFormEdit = popupFormEdit.elements.name;
const descriptionFormEdit = popupFormEdit.elements.about;
const nameFormAdd = popupFormAdd.elements.name;
const linkFormAdd = popupFormAdd.elements.link;
const linkFormEditProfilePhoto = popupFormEditPhoto.elements.link;
const elements = document.querySelector(".elements__list");
const template = document.getElementById("card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);
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
let profileId;
getProfileInfo()
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
    profileId = res._id;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//добавление первоначальных элементов
getInitialCards()
  .then((res) => {
    res.forEach((el) => {
      const newItem = createElement(
        el,
        profileId,
        cardTemplate,
        handlePopupOpenPhoto,
        cardSettings
      );
      addElement(elements, newItem, "append");
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
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
  patchProfileInfo(name, description)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
    })

    .catch((err) => console.log(err))
    .finally(() => (popupFormEdit.elements.save.textContent = "Сохранение..."));
}
console.log(popupFormEdit.elements.save.textContent);
//функция обработки сохранения попапа формы добавления
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const el = {
    name: String(nameFormAdd.value),
    link: String(linkFormAdd.value),
  };
  saveNewCard(el)
    .then((res) => {
      const newEl = createElement(
        res,
        profileId,
        cardTemplate,
        handlePopupOpenPhoto,
        cardSettings
      );
      addElement(elements, newEl, "prepend");
      evt.target.reset();
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(err))
    .finally(() => (popupFormAdd.elements.save.textContent = "Сохранение..."));
}

//функция обработки сохранения попапа формы редактирования фото
function handleFormEditPhotoSubmit(evt) {
  evt.preventDefault();
  patchProfileAvatar(linkFormEditProfilePhoto.value)
    .then(() => {
      profileAvatar.src = linkFormEditProfilePhoto.value;
      profileAvatar.alt = profileName.textContent;
      evt.target.reset();
      closePopup(popupEditProfilePhoto);
    })
    .catch((err) => console.log(err))
    .finally(
      () => (popupFormEditPhoto.elements.save.textContent = "Сохранение...")
    );
}

editButton.addEventListener("click", () => {
  popupFormEdit.elements.save.textContent = popupFormEdit.elements.save.ariaLabel;
  showPopup(popupEditProfile);
  resetValidation(popupFormEdit, validationSettings);
  nameFormEdit.value = profileName.textContent;
  descriptionFormEdit.value = profileDescription.textContent;
});

addButton.addEventListener("click", () => {

  popupFormAdd.elements.save.textContent = popupFormAdd.elements.save.ariaLabel;
  showPopup(popupAddCard);
  resetValidation(popupFormAdd, validationSettings);
  disableButton(popupFormAdd.elements.save);
});

profileAvatar.parentNode.addEventListener("click", () => {
  
  popupFormEditPhoto.elements.save.textContent = popupFormEditPhoto.elements.save.ariaLabel;
  showPopup(popupEditProfilePhoto);
  resetValidation(popupFormEditPhoto, validationSettings);
  disableButton(popupFormEditPhoto.elements.save);
});
enableValidation(validationSettings);

popupFormEdit.addEventListener("submit", handleFormEditSubmit);
popupFormAdd.addEventListener("submit", handleFormAddSubmit);
popupEditProfilePhoto.addEventListener("submit", handleFormEditPhotoSubmit);
popupDeleteCard.addEventListener("submit", handleDeletePopup);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
