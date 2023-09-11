import { addLike, deleteCard, removeLike } from "./api";
import { showPopup, handlePopupOpenPhoto } from "./modal";
import { handleSubmit } from "./utils";
import { popupDeleteCard } from "./constans.js";
const template = document.getElementById("card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);
let cardDelete = null;

// функция cоздания карточки
export const createElement = (el, profileId, settings) => {
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
    handlePopupOpenPhoto(itemImage.src, itemImage.alt);
  });

  return newCardTemplate;
};

const handleDislike = (likeButton, likeCount, el) => {
  removeLike(el._id)
    .then((res) => {
      likeCount.textContent = res.likes.length || "";
      likeButton.classList.remove("element__like_active");
    })
    .catch(console.error);
};

const handleLike = (likeButton, likeCount, el) => {
  addLike(el._id)
    .then((res) => {
      likeButton.classList.add("element__like_active");
      likeCount.textContent = res.likes.length;
    })
    .catch(console.error);
};

export const handleDeletePopup = (evt) => {
  const makeRequest = () => {
    return deleteCard(cardDelete.id).then(() => {
      cardDelete.remove();
      cardDelete = null;
    });
  };
  handleSubmit(makeRequest, evt, "Удаление...", false);
};
