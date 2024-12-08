// index.js
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Configuração de validação
const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
};

// Gerenciamento de informações do usuário
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

// Popup de edição de perfil
const profilePopup = new PopupWithForm(".popup", (formData) => {
  userInfo.setUserInfo({ name: formData.nome, bio: formData.sobre });
});
profilePopup.setEventListeners(); // Certifique-se de chamar setEventListeners

// Evento para abrir o popup de edição de perfil
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    document.querySelector("#popup__input-name").value = userInfoData.name;
    document.querySelector("#popup__input-about").value = userInfoData.bio;
    profilePopup.open();
  });

// Popup para visualização de imagens
const imagePopup = new PopupWithImage(".element__image-popup");
imagePopup.setEventListeners(); // Certifique-se de chamar setEventListeners

// Popup para adição de cartões
const addCardPopup = new PopupWithForm(".new__img-box", (formData) => {
  const newCard = createCard({ name: formData.titulo, link: formData.url });
  cardSection.addItem(newCard);
});
addCardPopup.setEventListeners(); // Certifique-se de chamar setEventListeners

// Evento para abrir o popup de adição de cartões
document.querySelector(".profile__add").addEventListener("click", () => {
  addCardPopup.open();
});

// Função para criar um cartão
function createCard(data) {
  const card = new Card(data, ".card-template", (cardData) => {
    imagePopup.open(cardData);
  });
  return card.getCardElement();
}

// Renderização inicial dos cartões
const cardSection = new Section(
  {
    items: [
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
    ],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

// Validação dos formulários
const profileValidator = new FormValidator(
  config,
  document.querySelector(".popup__form")
);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(
  config,
  document.querySelector(".new__img-form")
);
addCardValidator.enableValidation();
