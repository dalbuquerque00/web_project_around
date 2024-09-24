let editProfile = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveform = document.querySelector(".popup__form"); // Seleciona o formulário
let nameInput = document.querySelector("#popup__input-name");
let aboutInput = document.querySelector("#popup__input-about");
let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");

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
  event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

  // Atualiza o perfil com os valores do formulário
  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;

  closePopup();
}

saveform.addEventListener("submit", saveProfile);
