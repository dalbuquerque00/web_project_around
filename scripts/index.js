import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupOnOutsideClick } from "./utils.js";

// Seletores de elementos do DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const popupEditProfile = document.querySelector(".popup__box");
const popupAddImage = document.querySelector(".new__img-box");
const formEditProfile = document.querySelector(".popup__form");
const formAddImage = document.querySelector(".new__img-form");
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");
const titleInput = document.querySelector("#new__img_input-name");
const urlInput = document.querySelector("#new__img_input-url");
const cardsContainer = document.querySelector(".elements");

// Configurações para validação dos formulários
const formConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
};

// Cards iniciais
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

// Função para criar e renderizar cards
function createCard(data) {
  const card = new Card(data, "#card-template", openPopup);
  return card.generateCard();
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.append(cardElement);
  });
}

// Manipuladores de eventos
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function handleAddImageSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: urlInput.value,
  };
  const cardElement = createCard(newCard);
  cardsContainer.prepend(cardElement);
  closePopup(popupAddImage);
  formAddImage.reset();
}

// Eventos para abrir e fechar popups
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
  openPopup(popupEditProfile);
});

addImageButton.addEventListener("click", () => {
  formAddImage.reset();
  openPopup(popupAddImage);
});

formEditProfile.addEventListener("submit", handleProfileEditSubmit);
formAddImage.addEventListener("submit", handleAddImageSubmit);

// Fechar popups ao clicar fora da área ou com Esc
closePopupOnOutsideClick(popupEditProfile);
closePopupOnOutsideClick(popupAddImage);

// Inicialização da validação dos formulários
const editProfileFormValidator = new FormValidator(formConfig, formEditProfile);
editProfileFormValidator.enableValidation();

const addImageFormValidator = new FormValidator(formConfig, formAddImage);
addImageFormValidator.enableValidation();

// Renderizar os cards iniciais
renderInitialCards();

/* não estou conseguindo perceber meu erro, se eu testo os cards sem fazer os outros modulos, ele funciona normalmente 
Já tentei mudar o HTML algumas vezes tbm para ver se some o erro, mas resolvo um e vem outro. Pode tentar sinalizar onde
eu estou errando agora
*/
