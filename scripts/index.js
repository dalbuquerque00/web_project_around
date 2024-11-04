// Variáveis para edição de perfil
const editProfile = document.querySelector(".profile__edit-button");
const saveform = document.querySelector(".popup__form");
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const closeButton = saveform
  .closest(".popup__box, .new__img-box")
  .querySelector(".popup__close-button");

// Variáveis para adição de imagem
const addImageButton = document.querySelector(".profile__add");
const addImagePopup = document.querySelector(".new__img-box");
const addImageForm = document.querySelector(".new__img-form");
const titleInput = document.querySelector("#new__img_input-name");
const urlInput = document.querySelector("#new__img_input-url");
const saveButton = document.querySelector(".new__img_save-button");
const closeAddImagePopupButton = addImagePopup.querySelector(
  ".popup__close-button"
);

// Variáveis para expandir imagem
const imagePopup = document.querySelector(".element__image-popup");
const expandedImage = document.querySelector(".element__image-main");
const expandedImageTitle = document.querySelector(".element__image-name");
const closeImagePopupButton = document.querySelector("#expand__popup-close");

// Imagens iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Função para abrir o popup de perfil
function openPopup() {
  document.querySelector(".popup__box").classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
}
editProfile.addEventListener("click", openPopup);

// Função para fechar o popup
function closePopup() {
  document.querySelector(".popup__box").classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

// Função para salvar perfil
function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;
  closePopup();
}
saveform.addEventListener("submit", saveProfile);

// Função para abrir o popup de adicionar imagem
function openAddImagePopup() {
  addImagePopup.classList.add("popup_opened");
}
addImageButton.addEventListener("click", openAddImagePopup);

// Função para fechar o popup de adicionar imagem
function closeAddImagePopup() {
  addImagePopup.classList.remove("popup_opened");
}
closeAddImagePopupButton.addEventListener("click", closeAddImagePopup);

// Função para adicionar nova imagem
function addNewImage(event) {
  event.preventDefault();
  const newCard = { name: titleInput.value, link: urlInput.value };
  const cardElement = createCard(newCard);
  elementsContainer.prepend(cardElement);
  closeAddImagePopup();
  titleInput.value = "";
  urlInput.value = "";
  saveButton.setAttribute("disabled", true);
}
addImageForm.addEventListener("submit", addNewImage);

// Função para abrir o popup de imagem expandida
function openImagePopup(imageSrc, imageAlt) {
  expandedImage.src = imageSrc;
  expandedImage.alt = imageAlt;
  expandedImageTitle.textContent = imageAlt;
  imagePopup.classList.add("popup_opened");
}

// Função para fechar o popup de imagem expandida
function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}
closeImagePopupButton.addEventListener("click", closeImagePopup);

// Função para criar card
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("element");

  const cardImage = document.createElement("img");
  cardImage.classList.add("element__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () =>
    openImagePopup(card.link, card.name)
  );

  const cardBottom = document.createElement("div");
  cardBottom.classList.add("element__card-bottom");

  const cardName = document.createElement("p");
  cardName.classList.add("element__name");
  cardName.textContent = card.name;

  const cardLike = document.createElement("img");
  cardLike.classList.add("element__like");
  cardLike.src = "images/UIkit/like.svg";
  cardLike.alt = "Botão de like";
  cardLike.addEventListener("click", () => {
    cardLike.src = cardLike.src.includes("like.svg")
      ? "images/UIkit/like_black.png"
      : "images/UIkit/like.svg";
  });

  cardBottom.appendChild(cardName);
  cardBottom.appendChild(cardLike);

  const cardTrash = document.createElement("div");
  cardTrash.classList.add("element__trash");
  const cardTrashIcon = document.createElement("img");
  cardTrashIcon.classList.add("element__trash-icon");
  cardTrashIcon.src = "images/UIkit/Trash.png";
  cardTrashIcon.alt = "Ícone de lixeiro";
  cardTrashIcon.addEventListener("click", () => cardElement.remove());
  cardTrash.appendChild(cardTrashIcon);

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardBottom);
  cardElement.appendChild(cardTrash);

  return cardElement;
}

// Renderizar os cards iniciais
const elementsContainer = document.querySelector(".elements");
function renderCards() {
  initialCards.forEach((card) =>
    elementsContainer.appendChild(createCard(card))
  );
}
renderCards();

import { enableValidation, resetForm } from "./validate.js";

// Fechar popups com "Esc"

function handleKeyDown(event) {
  if (event.key === "Escape") {
    closePopup();
    closeAddImagePopup();
    closeImagePopup();

    // reset
    resetForm(saveform, {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button-save",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "invalid-input",
      errorClass: "input__errorMessage_block",
    });

    // reset do segundo form
    resetForm(addImageForm, {
      inputSelector: ".new__img_input",
      submitButtonSelector: ".new__img_save-button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "invalid-input",
      errorClass: "input__errorMessage_block",
    });
  }
}

document.addEventListener("keydown", handleKeyDown);

// Função para fechar popup ao clicar fora da área do conteúdo
function closePopupOnOutsideClick(popup, form) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_opened");
      resetForm(form, {
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button-save",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "invalid-input",
        errorClass: "input__errorMessage_block",
      });
    }
  });
}

const profilePopup = document.querySelector(".popup__box");
closePopupOnOutsideClick(profilePopup, saveform);

const imagePopupContainer = document.querySelector(".new__img-box");
closePopupOnOutsideClick(imagePopupContainer, addImageForm);

imagePopup.addEventListener("click", (event) => {
  if (event.target === imagePopup) {
    closeImagePopup();
  }
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
});

enableValidation({
  formSelector: ".new__img-form",
  inputSelector: ".new__img_input",
  submitButtonSelector: ".new__img_save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
});
