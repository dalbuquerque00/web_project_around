import Card from "./card.js";
import { FormValidator } from "./formValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import UserInfo from "./userInfo.js";

const validationConfigProfile = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
};

const validationConfigNewImg = {
  formSelector: ".new__img-form",
  inputSelector: ".new__img_input",
  submitButtonSelector: ".new__img_save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
};

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

//função para lidar com o clique no card
const handleCardClick = (link, name) => {
  imagePopup.open(link, name);
};

// Função para renderizar os cards de imagens
const renderCard = (cardData) => {
  const card = new Card(
    cardData.name,
    cardData.link,
    "#card-template",
    handleCardClick
  );
  return card.getCard();
};

// Renderiza as imagens iniciais
const imgSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements"
);
imgSection.renderItems();

// Popup para expandir as imagem
const imagePopup = new PopupWithImage(".element__image-popup");
imagePopup.setEventListeners();

const newImgPopup = new PopupWithForm(".new_img", (formData) => {
  const newCard = renderCard({ name: formData.title, link: formData.url });
  imgSection.addItem(newCard);
  newImgPopup.close();
});
newImgPopup.setEventListeners();

// Add evento ao btn para abrir o popup de add img
document
  .querySelector("#profile__edit-button")
  .addEventListener("click", () => {
    newImgPopup.open();
    newImgFormValidator.resetValidation();
  });

// Validação do formulário para adicionar imagens
const newImgFormValidator = new FormValidator(
  validationConfigNewImg,
  newImgPopup.getFormElement()
);
newImgFormValidator.enableValidation();

document.querySelector("#profile__add").addEventListener("click", () => {
  newImgFormValidator.resetValidation();
  newImgPopup.open();
});

// Informações do usuário
const userInfo = new UserInfo({
  name: "#popup__name",
  about: "#popup__about",
});

// Popup para edição de perfil - nome e bio
const editProfilePopup = new PopupWithForm("#editPopup", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Abertura do popup para editar perfil - nome e bio
document.querySelector("#popup__container").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues(currentUserInfo);
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});

// Validação do formulário de edição de perfil
const editProfileFormValidator = new FormValidator(
  validationConfigProfile,
  editProfilePopup.getFormElement()
);
editProfileFormValidator.enableValidation();
