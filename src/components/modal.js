
//функции открытия и закрытия попапа
function showPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handlePopupEsc);
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handlePopupEsc);
  }
  
  //функция обработки события esc
  function handlePopupEsc(evt) {
    if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
      closePopup(popup);
    }
  }

  export {showPopup, closePopup}