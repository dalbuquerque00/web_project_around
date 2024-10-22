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

// Função para fechar o popup de perfil
function closePopup() {
  document.querySelector(".popup__box").classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

// Função para salvar as informações do formulário
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

// Função para adicionar uma nova imagem
function addNewImage(event) {
  event.preventDefault();

  const newCard = {
    name: titleInput.value, // título
    link: urlInput.value, // URL
  };

  const cardElement = createCard(newCard);
  elementsContainer.prepend(cardElement);

  closeAddImagePopup();

  // Limpa o formulario
  titleInput.value = "";
  urlInput.value = "";

  // Desativa o botão "Salvar" até preencher tudo
  saveButton.setAttribute("disabled", true);
}

// Enviar a imagem nova
addImageForm.addEventListener("submit", addNewImage);

// Verificação do formulário
titleInput.addEventListener("input", checkFormValidity);
urlInput.addEventListener("input", checkFormValidity);

function checkFormValidity() {
  if (titleInput.value.trim() !== "" && urlInput.value.trim() !== "") {
    saveButton.removeAttribute("disabled");
  } else {
    saveButton.setAttribute("disabled", true);
  }
}

// Função para abrir o popup de imagem expandida
function openImagePopup(imageSrc, imageAlt) {
  expandedImage.src = imageSrc;
  expandedImage.alt = imageAlt;
  expandedImageTitle.textContent = imageAlt; // O título da imagem será o alt
  imagePopup.classList.add("popup_opened");
}

// Função para fechar o popup de imagem expandida
function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

// Evento para fechar o popup de imagem expandida
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

// Função para criar o card
function createCard(card) {
  // Cria o elemento do cartão
  const cardElement = document.createElement("div");
  cardElement.classList.add("element");

  // Cria a imagem do cartão
  const cardImage = document.createElement("img");
  cardImage.classList.add("element__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Adiciona evento de clique para expandir a imagem
  cardImage.addEventListener("click", () => {
    openImagePopup(card.link, card.name); // Expande a imagem ao clicar
  });

  // Cria nome e o like no cartão
  const cardBottom = document.createElement("div");
  cardBottom.classList.add("element__card-bottom");

  const cardName = document.createElement("p");
  cardName.classList.add("element__name");
  cardName.textContent = card.name;

  const cardLike = document.createElement("img");
  cardLike.classList.add("element__like");
  cardLike.src = "images/UIkit/like.svg";
  cardLike.alt = "Botão de like";

  // Mudança do botão de like
  cardLike.addEventListener("click", function () {
    if (cardLike.src.includes("like.svg")) {
      cardLike.src = "images/UIkit/like_black.png";
    } else {
      cardLike.src = "images/UIkit/like.svg";
    }
  });

  cardBottom.appendChild(cardName);
  cardBottom.appendChild(cardLike);

  // Lixeira
  const cardTrash = document.createElement("div");
  cardTrash.classList.add("element__trash");

  const cardTrashIcon = document.createElement("img");
  cardTrashIcon.classList.add("element__trash-icon");
  cardTrashIcon.src = "images/UIkit/Trash.png";
  cardTrashIcon.alt = "Ícone de lixeiro";

  cardTrash.appendChild(cardTrashIcon);

  // Excluir a foto
  cardTrashIcon.addEventListener("click", function () {
    cardElement.remove();
  });

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardBottom);
  cardElement.appendChild(cardTrash);

  return cardElement;
}

// Renderizar os cards iniciais
function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    elementsContainer.appendChild(cardElement);
  });
}

renderCards();
