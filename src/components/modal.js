import { disableButton } from "./validate";
//функции открытия и закрытия попапа
function showPopup(popup) {
    popup.classList.add("popup_opened");
    if (popup.contains(popup.querySelector(".popup__form"))) {
      disableButton(popup.querySelector(".popup__form").elements.save);
    }
    document.addEventListener("keydown", handlePopupEsc);
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handlePopupEsc);
  }
  
  //функция обработки события esc
  function handlePopupEsc(evt) {
    const popup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  }

  export {showPopup, closePopup}