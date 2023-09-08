import "./pages/index.css";
import {
  resetValidation,
  enableValidation,
  disableButton,
} from "./components/validate";
import {
  showPopup,
  closePopup,
  handlePopupOpenPhoto,
} from "./components/modal";
import { createElement, handleDeletePopup } from "./components/card";
import { addElement, handleSubmit } from "./components/utils";
import {
  getInitialCards,
  getProfileInfo,
  patchProfileAvatar,
  patchProfileInfo,
  saveNewCard,
} from "./components/api";
import { cardSettings, validationSettings } from "./components/constans";
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__avatar");
const editButton = profile.querySelector(".profile__edit");
const addButton = profile.querySelector(".profile__add");
const popups = Array.from(document.getElementsByClassName("popup"));
const popupEditProfile = document.getElementById("edit-profile");
export const popupDeleteCard = document.getElementById("delete-card");
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

let profileId;

//добавление первоначальных элементов
Promise.all([getProfileInfo(), getInitialCards()])
  //деструктурируем ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    profileId = userData._id;
    cards.forEach((el) => {
      const newItem = createElement(
        el,
        profileId,
        handlePopupOpenPhoto,
        cardSettings
      );
      console.log(el);
      addElement(elements, newItem, "append");
    });
  })
  .catch(console.error);

//функция обработки сохранения попапа формы редактирования
const handleFormEditSubmit = (evt) => {
  const makeRequest = () => {
    return patchProfileInfo(nameFormEdit.value, descriptionFormEdit.value).then(
      (res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
      }
    );
  };
  handleSubmit(makeRequest, evt);
};

//функция обработки сохранения попапа формы добавления
const handleFormAddSubmit = (evt) => {
  const el = {
    name: nameFormAdd.value,
    link: linkFormAdd.value,
  };
  const makeRequest = () => {
    return saveNewCard(el).then((res) => {
      const newEl = createElement(
        res,
        profileId,
        handlePopupOpenPhoto,
        cardSettings
      );
      addElement(elements, newEl, "prepend");
    });
  };

  handleSubmit(makeRequest, evt);
};

//функция обработки сохранения попапа формы редактирования фото
const handleFormEditPhotoSubmit = () => {
  const makeRequest = () => {
    return patchProfileAvatar(linkFormEditProfilePhoto.value).then((res) => {
      profileAvatar.src = res.avatar;
      profileAvatar.alt = profileName.textContent;
    });
  };

  handleSubmit(makeRequest, evt);
};

editButton.addEventListener("click", () => {
  showPopup(popupEditProfile);
  resetValidation(popupFormEdit, validationSettings);
  disableButton(popupFormEdit.elements.save);
  nameFormEdit.value = profileName.textContent;
  descriptionFormEdit.value = profileDescription.textContent;
});

addButton.addEventListener("click", () => {
  showPopup(popupAddCard);
  resetValidation(popupFormAdd, validationSettings);
  disableButton(popupFormAdd.elements.save);
});

profileAvatar.parentNode.addEventListener("click", () => {
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
