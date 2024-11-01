const editProfile = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveform = document.querySelector(".popup__form");
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// Variáveis para adição de imagem
const addImageButton = document.querySelector(".profile__add");
const addImagePopup = document.querySelector(".new__img-box");
const addImageForm = document.querySelector(".new__img-form");
const titleInput = document.querySelector("#new__img_input-name");
const urlInput = document.querySelector("#new__img_input-url");
const saveButton = document.querySelector(".new__img_save-button");
const closeAddImagePopupButton = document.querySelector(
  ".new__img_close-button"
);

// Variáveis para expandir imagem
const imagePopup = document.querySelector(".element__image-popup");
const expandedImage = document.querySelector(".element__image-main");
const expandedImageTitle = document.querySelector(".element__image-name");
const closeImagePopupButton = document.querySelector("#expand__popup-close");

// Função para abrir o popup de perfil
function openPopup() {
  document.querySelector(".popup__box").classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;
}
editProfile.addEventListener("click", openPopup);

function closePopup() {
  document.querySelector(".popup__box").classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

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

function closeAddImagePopup() {
  addImagePopup.classList.remove("popup_opened");
}
closeAddImagePopupButton.addEventListener("click", closeAddImagePopup);

function addNewImage(event) {
  event.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: urlInput.value,
  };
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
const elementsContainer = document.querySelector(".elements");

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

function renderCards() {
  initialCards.forEach((card) =>
    elementsContainer.appendChild(createCard(card))
  );
}
renderCards();

// Fechar os popups com "Esc"
function handleKeyDown(event) {
  if (event.key === "Escape") {
    closePopup();
    closeAddImagePopup();
    closeImagePopup();

    saveform.reset();
    addImageForm.reset();

    document.querySelectorAll(".popup__error").forEach((error) => {
      error.textContent = "";
    });

    // Habilitar o botão de salvar
    saveButton.setAttribute("disabled", true);
  }
}

document.addEventListener("click", (event) => {
  const popupBox = document.querySelector(".popup__box");
  const newImgBox = document.querySelector(".new__img-box");

  if (
    popupBox.classList.contains("popup_opened") &&
    !popupBox.contains(event.target) &&
    !editProfile.contains(event.target)
  ) {
    closePopup();
  }

  if (
    newImgBox.classList.contains("popup_opened") &&
    !newImgBox.contains(event.target) &&
    !addImageButton.contains(event.target)
  ) {
    closeAddImagePopup();
  }
});

document.addEventListener("keydown", handleKeyDown);
