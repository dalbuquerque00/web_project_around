const editProfile = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveform = document.querySelector(".popup__form"); // Seleciona o formulário
const nameInput = document.querySelector("#popup__input-name");
const aboutInput = document.querySelector("#popup__input-about");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// Função para abrir o popup
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

// Função para salvar as informações do formulário
function saveProfile(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;

  closePopup();
}

saveform.addEventListener("submit", saveProfile);
