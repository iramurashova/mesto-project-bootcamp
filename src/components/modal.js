const popupOpenPhoto = document.getElementById("open-image");
const image = popupOpenPhoto.querySelector(".popup__image");
const caption = popupOpenPhoto.querySelector(".popup__caption");

//функции открытия и закрытия попапа
const showPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupEsc);
}

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePopupEsc);
}

//функция обработки события esc
const handlePopupEsc = (evt) =>{
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

const handlePopupOpenPhoto = (link, name) => {
  showPopup(popupOpenPhoto);
  image.src = link;
  image.alt = name;
  caption.textContent = name;
}

export { showPopup, closePopup, handlePopupOpenPhoto };
