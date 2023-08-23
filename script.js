const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profile.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupInputs = popup.querySelector(".popup__inputs");
const popupSave = popup.querySelector(".popup__save");
const closeButton = popup.querySelector(".popup__close");

const elements = document.querySelector(".elements__list");
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
const template = document.querySelector("#card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);
function createElement(el) {
  const newCardTemplate = cardTemplate.cloneNode(true);
  const itemImage = newCardTemplate.querySelector(".element__image");
  const itemName = newCardTemplate.querySelector(".element__title");
  itemImage.src = el.link;
  itemName.textContent = el.name;
  return newCardTemplate;
}

function addElement(el) {
  elements.append(el);
}

initialCards.forEach((el) => {
  const newItem = createElement(el);
  addElement(newItem);
});

function showPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function getInfoFromProfile(items, newItems) {
    for (let i = 0; i < newItems.length; i++) {
      newItems[i].value = items[i].textContent;
    }
    return newItems;
  }
  
  function getInfoFromForm(items, newItems) {
    for (let i = 0; i < items.length; i++) {
      newItems[i].textContent = items[i].value;
    }
    return newItems;
  }
  function handleFormSubmit(evt) {
    evt.preventDefault();
    getInfoFromForm(popupInputs.children, profileInfo.children);
    closePopup();
  }
  
  
  editButton.addEventListener("click", () => {
    showPopup();
    getInfoFromProfile(profileInfo.children, popupInputs.children);
  });
  closeButton.addEventListener("click", closePopup);
  popupForm.addEventListener("submit", handleFormSubmit);
  
