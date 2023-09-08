(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{H:()=>D});var t=function(e,t){e.classList.remove(t.inputErrorClass);var n="".concat(e.id,"-error");document.getElementById(n).textContent=""},n=function(e,n){e.reset(),e.querySelectorAll(n.inputSelector).forEach((function(e){t(e,n)}))},r=function(e){e.disabled=!0},o=function(e,t){e.checkValidity()?t.disabled=!1:r(t)},c=document.getElementById("open-image"),a=c.querySelector(".popup__image"),i=c.querySelector(".popup__caption"),l=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",s)},u=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",s)},s=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");u(t)}},d=function(e,t){l(c),a.src=e,a.alt=t,i.textContent=t},m={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-12",headers:{authorization:"e85605fa-1b94-4540-ab40-bcd2b4ead3cb","Content-Type":"application/json"}},f=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},p=function(e,t){return fetch("".concat(m.baseUrl).concat(e),t).then(f)},v=function(e,t,n){e[n](t)},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.textContent=e?n:t.ariaLabel},y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter;h(!0,r,n),e().then((function(){t.target.reset(),u(t.target.closest(".popup"))})).catch(console.error).finally((function(){h(!1,r)}))},_=document.forms.delete_card.elements.save,S=document.getElementById("card").content.querySelector(".element").cloneNode(!0),E=null,b=function(e,t,n,r){var o=S.cloneNode(!0),c=o.querySelector(r.imageSelector),a=o.querySelector(r.titleSelector),i=o.querySelector(r.likeButtonSelector),u=o.querySelector(r.likeCountSelector),s=o.querySelector(r.deleteButtonSelector);return e.owner._id!==t?s.remove():s.addEventListener("click",(function(t){l(D),(E=t.target.closest(".element")).id=e._id})),Boolean(e.likes.find((function(e){return e._id===t})))&&i.classList.add("element__like_active"),i.addEventListener("click",(function(){i.classList.contains("element__like_active")?g(i,u,e):k(i,u,e)})),u.textContent=e.likes.length||"",c.src=e.link,c.alt=e.name,a.textContent=e.name,c.addEventListener("click",(function(){n(c.src,c.alt)})),o},g=function(e,t,n){var r;(r=n._id,p("/cards/likes/".concat(r),{method:"DELETE",headers:m.headers})).then((function(n){t.textContent=n.likes.length||"",e.classList.remove("element__like_active")})).catch(console.error)},k=function(e,t,n){var r;(r=n._id,p("/cards/likes/".concat(r),{method:"PUT",headers:m.headers})).then((function(n){e.classList.add("element__like_active"),t.textContent=n.likes.length})).catch(console.error)},L={imageSelector:".element__image",titleSelector:".element__title",likeButtonSelector:".element__like",likeCountSelector:".element__like-count",deleteButtonSelector:".element__delete"},C={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save",inputErrorClass:"popup__input_type_error"};function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var x,B,A=document.querySelector(".profile"),w=A.querySelector(".profile__name"),I=A.querySelector(".profile__description"),O=A.querySelector(".profile__avatar"),j=A.querySelector(".profile__edit"),P=A.querySelector(".profile__add"),T=Array.from(document.getElementsByClassName("popup")),N=document.getElementById("edit-profile"),D=document.getElementById("delete-card"),U=document.getElementById("add-card"),H=document.getElementById("edit-profile_photo"),J=document.forms.profile,M=document.forms.profile_photo,z=document.forms.card,V=J.elements.name,$=J.elements.about,F=z.elements.name,G=z.elements.link,K=M.elements.link,Q=document.querySelector(".elements__list");Promise.all([p("/users/me",{headers:m.headers}),p("/cards",{headers:m.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],l=!0,u=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);l=!0);}catch(e){u=!0,o=e}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];w.textContent=o.name,I.textContent=o.about,O.src=o.avatar,x=o._id,c.forEach((function(e){var t=b(e,x,d,L);v(Q,t,"append")}))})).catch(console.error),j.addEventListener("click",(function(){l(N),n(J,C),r(J.elements.save),V.value=w.textContent,$.value=I.textContent})),P.addEventListener("click",(function(){l(U),n(z,C),r(z.elements.save)})),O.parentNode.addEventListener("click",(function(){l(H),n(M,C),r(M.elements.save)})),B=C,document.querySelectorAll(B.formSelector).forEach((function(e){e.addEventListener("input",(function(){return function(e,n){var c=e.querySelector(n.submitButtonSelector);o(e,c),e.addEventListener("reset",(function(){r(c)})),e.querySelectorAll(n.inputSelector).forEach((function(r){r.addEventListener("input",(function(){(function(e,n){e.validity.valid?t(e,n):function(e,t,n){e.classList.add(n.inputErrorClass);var r="".concat(e.id,"-error"),o=document.getElementById(r);o?o.textContent=t:console.error("Error element with id '".concat(r,"' not found"))}(e,e.validationMessage,n)})(r,n),o(e,c)}))}))}(e,B)}))})),J.addEventListener("submit",(function(e){y((function(){return(e=V.value,t=$.value,p("/users/me",{method:"PATCH",headers:m.headers,body:JSON.stringify({name:e,about:t})})).then((function(e){w.textContent=e.name,I.textContent=e.about}));var e,t}),e)})),z.addEventListener("submit",(function(e){var t={name:F.value,link:G.value};y((function(){return(e=t,p("/cards",{method:"POST",headers:m.headers,body:JSON.stringify({name:e.name,link:e.link})})).then((function(e){var t=b(e,x,d,L);v(Q,t,"prepend")}));var e}),e)})),H.addEventListener("submit",(function(){y((function(){return(e=K.value,p("/users/me/avatar",{method:"PATCH",headers:m.headers,body:JSON.stringify({avatar:e})})).then((function(e){O.src=e.avatar,O.alt=w.textContent}));var e}),evt)})),D.addEventListener("submit",(function(e){return e.preventDefault(),h(!0,_,"Удаление..."),(t=E.id,p("/cards/".concat(t),{method:"DELETE",headers:m.headers})).then((function(){E.remove(),E=null,u(e.target.closest(".popup"))})).catch(console.error).finally((function(){h(!1,_)}));var t})),T.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&u(e),t.target.classList.contains("popup__close")&&u(e)}))}))})();