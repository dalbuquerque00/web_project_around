import { Card } from "./card.js";
import { openPopup, closePopup, selectors } from "./utils.js";
import { enableValidation, resetForm } from "./formValidator.js";

const { popupEdit, popupImage, formEditProfile, formAddCard } = selectors;

// Renderizar os cards iniciais
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

initialCards.forEach((data) => {
  const card = new Card(
    data.name,
    data.link,
    ".card-template",
    handleCardClick
  );
  document.querySelector(".elements").appendChild(card.generateCard());
});

// Perfil
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");

// Botões
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add");

// Abrir o popup de edição
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
  openPopup(popupEdit);
});

// Função para abrir o popup de visualização
function handleCardClick(link, name) {
  const popupImageElement = document.querySelector(".element__image-main");
  const popupNameElement = document.querySelector(".element__image-name");

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupNameElement.textContent = name;

  openPopup(popupImage);
}

// Adicionar novos cards
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#new__img_input-name").value;
  const urlInput = document.querySelector("#new__img_input-url").value;

  const card = new Card(
    titleInput,
    urlInput,
    ".card-template",
    handleCardClick
  );
  document.querySelector(".elements").prepend(card.generateCard());

  closePopup(formAddCard);
  resetForm(formAddCard, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "invalid-input",
    errorClass: "input__errorMessage_block",
  });
}
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

// Abrir o popup de adicionar card
addCardButton.addEventListener("click", () => {
  openPopup(formAddCard);
});

// Validação
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
});

// Função para salvar o perfil
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;
  closePopup(popupEdit);
}
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
