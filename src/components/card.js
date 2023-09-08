
import { addLike, deleteCard, removeLike } from "./api";
import { closePopup, showPopup } from "./modal";
import { renderLoading } from "./utils";
import { popupDeleteCard } from "../index.js";
const popupFormDeleteCard = document.forms.delete_card;
const buttonSubmit = popupFormDeleteCard.elements.save;

const template = document.getElementById("card");
const cardTemplate = template.content.querySelector(".element").cloneNode(true);
let cardDelete = null;

// функция cоздания карточки

export const createElement = (
  el,
  profileId,
  openPhoto,
  settings
) => {
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
    openPhoto(itemImage.src, itemImage.alt);
  });

  return newCardTemplate;
};

const handleDislike = (likeButton, likeCount, el) => {
  removeLike(el._id)
    .then((res) => {
      likeCount.textContent = res.likes.length || "";
      likeButton.classList.remove("element__like_active");
      console.log(`Меня дизлайкнули ${likeButton.classList}`);
    })
    .catch((err) => console.log(err));
};

const handleLike = (likeButton, likeCount, el) => {
  addLike(el._id)
    .then((res) => {
      likeButton.classList.add("element__like_active");
      console.log(`Меня лайкнули ${likeButton.classList}`);
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
};

export const handleDeletePopup = (evt) => {
  evt.preventDefault();
  renderLoading(true, buttonSubmit, "Удаление...");
  return deleteCard(cardDelete.id)
    .then(() => {
      cardDelete.remove();
      cardDelete = null;
      closePopup(evt.target.closest(".popup"));
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, buttonSubmit);
    });
};
