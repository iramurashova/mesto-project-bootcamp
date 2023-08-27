const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const editButton = profile.querySelector(".profile__edit");
const addButton = profile.querySelector(".profile__add");
const popupEditProfile = document.getElementById("edit_profile");
const popupOpenPhoto = document.getElementById("open_image");
const image = popupOpenPhoto.querySelector(".popup__image");
const caption = popupOpenPhoto.querySelector(".popup__caption");
const popupAddCard = document.getElementById("add_card");
const popupFormEdit = document.forms.profile;
const popupFormAdd = document.forms.card;
const nameFormEdit = popupFormEdit.elements.name;
const descriptionFormEdit = popupFormEdit.elements.about;
const nameFormAdd = popupFormAdd.elements.name;
const linkFormAdd = popupFormAdd.elements.link;
const closeButtons = document.querySelectorAll('.popup__close');
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
const template = document.getElementById("card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);

function createElement(el) {
  const newCardTemplate = cardTemplate.cloneNode(true);
  const itemImage = newCardTemplate.querySelector(".element__image");
  const itemName = newCardTemplate.querySelector(".element__title");
  const likeButton = newCardTemplate.querySelector(".element__like");
  const deleteButton = newCardTemplate.querySelector(".element__delete");
  itemImage.src = el.link;
  itemImage.alt = el.name;
  itemName.textContent = el.name;
  likeButton.addEventListener("click", toggleStatusLike);
  deleteButton.addEventListener("click", () => newCardTemplate.remove());
  itemImage.addEventListener("click", () => {
    showPopup(popupOpenPhoto);
    image.src = itemImage.src;
    image.alt = itemImage.alt;
    caption.textContent = itemName.textContent;
  });
  return newCardTemplate;
}

function addElement(el, method) {
  elements[method](el);
}

initialCards.forEach((el) => {
  const newItem = createElement(el);
  addElement(newItem, "append");
});

function showPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  console.log("click");
  const name = nameFormEdit.value;
  const description = descriptionFormEdit.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEditProfile);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const el = {
    name: String(nameFormAdd.value),
    link: String(linkFormAdd.value),
  };
  const newEl = createElement(el);
  console.log(newEl);
  addElement(newEl, "prepend");
  evt.target.reset()
  closePopup(popupAddCard);

}

function toggleStatusLike(el) {
  el.target.classList.toggle("element__like_active");
}
editButton.addEventListener("click", () => {
  showPopup(popupEditProfile);
  nameFormEdit.value = profileName.textContent;
  descriptionFormEdit.value = profileDescription.textContent;
});

addButton.addEventListener("click", () => {
  showPopup(popupAddCard);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
popupFormEdit.addEventListener("submit", handleFormEditSubmit);
popupFormAdd.addEventListener("submit", handleFormAddSubmit);
