let editProfile = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close-button");

function openPopup() {
  document.querySelector(".popup__box").classList.add("popup_opened");
}

editProfile.addEventListener("click", openPopup);

function closePopup() {
  document.querySelector(".popup__box").classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);
