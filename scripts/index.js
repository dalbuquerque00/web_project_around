import { openPopup, closePopup } from "./utils.js";
import { enableValidation } from "./formValidator.js";
import { Card } from "./card.js";

// Seletores dos elementos no DOM
const editProfileButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add");
const popupEdit = document.querySelector(".popup-edit");
const popupNewImage = document.querySelector(".popup-new-image");
const popupImage = document.querySelector(".element__image-popup");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formAddCard = popupNewImage.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const nameInput = document.querySelector("#popup__input-name");
const bioInput = document.querySelector("#popup__input-about");
const cardContainer = document.querySelector(".elements");

// Configuração inicial dos cards
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

// Renderiza os cards iniciais
initialCards.forEach((data) => {
  const card = new Card(data.name, data.link, ".card-template", openImagePopup);
  cardContainer.appendChild(card.generateCard());
});

// Função para abrir o popup de visualização de imagem
function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector(".element__image-main");
  const popupImageTitle = popupImage.querySelector(".element__image-name");

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImageTitle.textContent = name;

  openPopup(popupImage);
}

// Abertura dos popups
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  openPopup(popupEdit);
});

addImageButton.addEventListener("click", () => {
  formAddCard.reset();
  openPopup(popupNewImage);
});

// Fechamento dos popups
const closeButtons = document.querySelectorAll(".popup__close-button");
closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

// Salvando as edições do perfil
formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(popupEdit);
});

// Adicionando novos cards
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = formAddCard.querySelector("#new__img_input-name").value;
  const link = formAddCard.querySelector("#new__img_input-url").value;
  const newCard = new Card(title, link, ".card-template", openImagePopup);
  cardContainer.prepend(newCard.generateCard());
  closePopup(popupNewImage);
});

// Validação dos formulários
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
