export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

export function closePopup(popup) {
  resetForm(popup); // Reseta o formulário
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

// Resetar formulario

export function resetForm(popup) {
  const form = popup.querySelector("form");
  if (form) {
    form.reset(); // Reseta os campos do formulário
    const errorElements = form.querySelectorAll(".popup__error");
    const inputs = form.querySelectorAll(".popup__input");

    // Remove erros e classes de validação
    errorElements.forEach((errorElement) => {
      errorElement.textContent = ""; // Limpa a mensagem de erro
    });

    inputs.forEach((input) => {
      input.classList.remove("invalid-input"); // Remove a classe de erro
    });

    // Desativa o botão de envio
    const submitButton = form.querySelector(".popup__button-save");
    if (submitButton) {
      submitButton.classList.add("popup__button_disabled");
      submitButton.disabled = true;
    }
  }
}
function closeOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
