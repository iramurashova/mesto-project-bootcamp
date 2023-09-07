const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-12",
  headers: {
    authorization: "e85605fa-1b94-4540-ab40-bcd2b4ead3cb",
    "Content-Type": "application/json",
  },
};
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

const patchProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};
const patchProfileAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(checkResponse);
  };

const saveNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(checkResponse);
};
const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

const addLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(checkResponse);
    };

    const removeLike = (id) => {
        return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: config.headers,
          }).then(checkResponse);
        };


export {
  getProfileInfo,
  getInitialCards,
  patchProfileInfo,
  saveNewCard,
  deleteCard,
  addLike,
  removeLike,
  patchProfileAvatar
};
