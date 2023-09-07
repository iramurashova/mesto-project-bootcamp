import { profileName } from "..";
import { addLike, deleteCard, removeLike } from "./api";
import { closePopup, showPopup } from "./modal";
import { isEqual } from "./utils";
import { popupDeleteCard} from "../index.js";
const popupFormDeleteCard = document.forms.delete_card;
let cardDelete = null;

// функция cоздания карточки

export function createElement(
  el,
  profileId,
  cardTemplate,
  openPhoto,
  settings
) {
  const newCardTemplate = cardTemplate.cloneNode(true);
  const itemImage = newCardTemplate.querySelector(settings.imageSelector);
  const itemName = newCardTemplate.querySelector(settings.titleSelector);
  const likeButton = newCardTemplate.querySelector(settings.likeButtonSelector);
  const likeCount = newCardTemplate.querySelector(settings.likeCountSelector);
  const deleteButton = newCardTemplate.querySelector(
    settings.deleteButtonSelector
  );
  if (!(el.owner._id === profileId)) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) => {
      popupFormDeleteCard.elements.save.textContent = popupFormDeleteCard.elements.save.ariaLabel;
      showPopup(popupDeleteCard);
      cardDelete = evt.target.closest(".element");
      cardDelete.id = el._id;
    });
  }

  if (Boolean(el.likes.find((el) => el._id === profileId))) {
    likeButton.classList.add("element__like_active");
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("element__like_active")) {
      handleDislike(likeButton, likeCount, el);
    } else {
      handleLike(likeButton, likeCount, el);
    }
  });
  likeCount.textContent = el.likes.length || "";
  itemImage.src = el.link;
  itemImage.alt = el.name;
  itemName.textContent = el.name;
  itemImage.addEventListener("click", () => {
    openPhoto(itemImage.src, itemImage.alt);
  });
  
  return newCardTemplate;
}

function handleDislike(likeButton, likeCount, el) {
  likeButton.classList.add("element__like_active");
  removeLike(el._id)
    .then((res) => {
      likeCount.textContent = res.likes.length || "";
      likeButton.classList.remove("element__like_active");
      console.log(`Меня дизлайкнули ${likeButton.classList}`);
    })
    .catch((err) => console.log(err));
}

function handleLike(likeButton, likeCount, el) {
  addLike(el._id)
    .then((res) => {
      likeButton.classList.add("element__like_active");
      console.log(`Меня лайкнули ${likeButton.classList}`);
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export function handleDeletePopup(evt) {
  evt.preventDefault();
  return deleteCard(cardDelete.id)
    .then(() => {
      cardDelete.remove();
      closePopup(popupDeleteCard);
      cardDelete = null;
    })
    .catch((err) => console.log(err))
    .finally(
      () =>
        (popupDeleteCard.querySelector(".popup__save").textContent =
          "Удаление...")
    );
}
