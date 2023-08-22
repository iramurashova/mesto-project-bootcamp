const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profile.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupInputs = popup.querySelector(".popup__inputs");
const popupSave = popup.querySelector(".popup__save");
const closeButton = popup.querySelector(".popup__close");

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
