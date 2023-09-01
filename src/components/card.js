import { showPopup } from "./modal";


//функция переключения класса лайка
function toggleStatusLike(el) {
    el.target.classList.toggle("element__like_active");
  }
// функция cоздания карточки

export default function createElement(el,cardTemplate, openPhoto, settings) {
    const newCardTemplate = cardTemplate.cloneNode(true);
    const itemImage = newCardTemplate.querySelector(settings.imageSelector);
    const itemName = newCardTemplate.querySelector(settings.titleSelector);
    const likeButton = newCardTemplate.querySelector(settings.likeButtonSelector);
    const deleteButton = newCardTemplate.querySelector(settings.deleteButtonSelector);
    itemImage.src = el.link;
    itemImage.alt = el.name;
    itemName.textContent = el.name;
    likeButton.addEventListener("click", toggleStatusLike);
    deleteButton.addEventListener("click", () => newCardTemplate.remove());
    itemImage.addEventListener("click", () => {
     openPhoto(itemImage.src, itemImage.alt)
    });
    return newCardTemplate;
  }

  export {createElement}