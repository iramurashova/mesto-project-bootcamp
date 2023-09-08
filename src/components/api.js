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


const request = (endPoint, options) => {
    return fetch(`${config.baseUrl}${endPoint}`, options).then(checkResponse)
  }


const getProfileInfo = () => {
   return request(`/users/me`,{
        headers: config.headers,
      }) 
};
const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers,
  })
};

const patchProfileInfo = (name, about) => {
  return request(`/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
};
const patchProfileAvatar = (link) => {
    return request(`/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
  };

const saveNewCard = (card) => {
  return request(`/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
};
const deleteCard = (id) => {
  return request(`/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

const addLike = (id) => {
    return request(`/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    };

    const removeLike = (id) => {
        return request(`/cards/likes/${id}`, {
            method: "DELETE",
            headers: config.headers,
          })
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
