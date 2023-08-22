const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
function showPopup () {
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);