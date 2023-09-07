import { profileName } from "..";
import { addLike, deleteCard, getProfileInfo, removeLike } from "./api";
import { showPopup } from "./modal";
import { isEqual } from "./utils";

//функция переключения класса лайка
function toggleStatusLike(el) {
  el.classList.toggle("element__like_active");
}
// функция cоздания карточки

export default function createElement(
  el,
  profileId,
  owner,
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

  if (Boolean(el.likes.find((el) => el._id === profileId))) {
    likeButton.classList.add("element__like_active");
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains('element__like_active')) {
      handleDislike(likeButton, likeCount, el);
    } else {
      handleLike(likeButton, likeCount, el);
    }
  });
  likeCount.textContent = el.likes.length || "";

  if (el.owner._id === profileId) {
    deleteButton.disabled = false;
    deleteButton.addEventListener("click", () => {
      deleteCard(el._id)
        .then(() => {
          newCardTemplate.remove();
        })
        .catch((err) => console.log(err));
    });
  } else {
    deleteButton.disabled = true;
  }
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

export { createElement };
