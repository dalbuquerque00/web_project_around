import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import { validationConfig } from "../utils/config.js";
import {
  profileSelectors,
  popupSelectors,
  cardSelectors,
  forms,
  editProfileElements,
} from "../utils/constants.js";

// Conexão
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "44300d4b-fe58-42de-a817-6a20b8affcdd",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: profileSelectors.nameElement,
  jobSelector: profileSelectors.jobElement,
  avatarSelector: profileSelectors.avatarElement,
});

const imagePopup = new PopupWithImage(popupSelectors.imagePopup);
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(popupSelectors.deletePopup);
deleteCardPopup.setEventListeners();

let userId;
let cardSection;

api
  .getAppInfo()
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      cardSelectors.container
    );

    cardSection.renderItems();
  })

  // DEBUG
  .catch((err) => {
    console.log(`Erro ao carregar dados: ${err}`);
  });

const createCard = (data) => {
  const card = new Card({
    data: {
      ...data,
      owner:
        data.owner && typeof data.owner === "object"
          ? data.owner._id
          : data.owner,
    },
    userId,
    templateSelector: cardSelectors.template,
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    handleDeleteClick: (card) => {
      deleteCardPopup.setSubmitHandler(() => {
        deleteCardPopup.renderLoading(true);
        api
          .deleteCard(card.getId())
          .then(() => {
            card.remove();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(`Erro ao carregar imagens: ${err}`);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
      deleteCardPopup.open();
    },
    handleLikeClick: (card) => {
      const isLiked = card.isLiked();
      api
        .changeLikeCardStatus(card.getId(), isLiked)
        .then((newCardData) => {
          card.setLikeStatus(newCardData.isLiked);
        })
        .catch((err) => {
          console.log(`Erro ao mudar o estado do like: ${err}`);
        });
    },
  });
  return card.generateCard();
};

const editProfilePopup = new PopupWithForm(
  popupSelectors.editPopup,
  (formData) => {
    editProfilePopup.renderLoading(true);
    api
      .updateUserInfo(formData.name, formData.job)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Erro em atualizar o perfil: ${err}`);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupSelectors.addPopup, (formData) => {
  addCardPopup.renderLoading(true);
  api
    .addCard(formData.title, formData.link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao moitarr o popup: ${err}`);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  popupSelectors.avatarPopup,
  (formData) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar(formData.avatar)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Erro em atualizar o avatar: ${err}`);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  }
);
avatarPopup.setEventListeners();

document
  .querySelector(profileSelectors.editButton)
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    editProfileElements.nameInput.value = currentUserInfo.name;
    editProfileElements.jobInput.value = currentUserInfo.job;
    editFormValidator.resetValidation();
    editProfilePopup.open();
  });

document
  .querySelector(profileSelectors.addButton)
  .addEventListener("click", () => {
    addFormValidator.resetValidation();
    addCardPopup.open();
  });

document
  .querySelector(profileSelectors.avatarEdit)
  .addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
  });

const editFormValidator = new FormValidator(validationConfig, forms.editForm);
const addFormValidator = new FormValidator(validationConfig, forms.addForm);
const avatarFormValidator = new FormValidator(
  validationConfig,
  forms.avatarForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
