import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, resetForm } from "./utils.js";

// Elementos DOM
const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const cardContainer = document.querySelector(".elements");
const addImageButton = document.querySelector(".profile__add");
const imagePopup = document.querySelector(".new__img-box");
const imageForm = document.querySelector(".new__img-form");
const expandedImagePopup = document.querySelector(".element__image-popup");
const expandedImage = document.querySelector(".element__image-main");
const expandedImageTitle = document.querySelector(".element__image-name");
const closeProfilePopupButton = profilePopup.querySelector(
  ".popup__close-button"
);
const closeImagePopupButton = imagePopup.querySelector(".popup__close-button");
const closeExpandedImagePopupButton = expandedImagePopup.querySelector(
  ".element__button-close"
);

// Configuração de validação
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
};

// Função para expandir imagens
function handleCardClick(link, name) {
  openPopup(expandedImagePopup);
  expandedImage.src = link;
  expandedImage.alt = name;
  expandedImageTitle.textContent = name;
}

// Cartões iniciais
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

// Adicionar ouvintes de clique para fechar popups ao clicar fora
function closeOnOutsideClick(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}

[profilePopup, imagePopup, expandedImagePopup].forEach((popup) => {
  popup.addEventListener("click", closeOnOutsideClick);
});

// Adicionar eventos aos botões de fechar
closeProfilePopupButton.addEventListener("click", () =>
  closePopup(profilePopup)
);
closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));
closeExpandedImagePopupButton.addEventListener("click", () =>
  closePopup(expandedImagePopup)
);

// Funções de manipulação de eventos
editProfileButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;
  closePopup(profilePopup);
});

addImageButton.addEventListener("click", () => openPopup(imagePopup));

imageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#new__img_input-name").value;
  const link = document.querySelector("#new__img_input-url").value;
  const newCard = new Card({ name, link }, ".card-template", handleCardClick);
  cardContainer.prepend(newCard.getCardElement());
  closePopup(imagePopup);
});

// Renderizar os cartões iniciais
initialCards.forEach((data) => {
  const card = new Card(data, ".card-template", handleCardClick);
  cardContainer.append(card.getCardElement());
});

// Validação
const profileValidator = new FormValidator(config, profileForm);
profileValidator.enableValidation();

const imageValidator = new FormValidator(config, imageForm);
imageValidator.enableValidation();

// Função para abrir o popup de edição de perfil
editProfileButton.addEventListener("click", () => {
  console.log("Botão 'Editar Perfil' clicado"); // Debug
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
});
