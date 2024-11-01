// Chama a função de habilitar validação para cada formulário
enableValidation({
  formSelector: ".popup__form", // Formulário de edição de perfil
  inputSelector: ".popup__input", // Inputs do formulário de edição de perfil
  submitButtonSelector: ".popup__button-save", // Botão do popup de editar perfil
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
});

// Chama a função de habilitar validação para o formulário de nova imagem
enableValidation({
  formSelector: ".new__img-form", // Formulário de nova imagem
  inputSelector: ".new__img_input", // Ajuste para o seletor correto dos inputs do novo formulário
  submitButtonSelector: ".new__img_save-button", // Botão do popup de nova imagem
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "invalid-input",
  errorClass: "input__errorMessage_block",
});

// Função para habilitar a validação do formulário
function enableValidation(config) {
  const formElements = document.querySelectorAll(config.formSelector);

  formElements.forEach((formElement) => {
    const inputs = formElement.querySelectorAll(config.inputSelector);
    const formButton = formElement.querySelector(config.submitButtonSelector);

    formButton.disabled = true;

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const isValid = input.checkValidity();
        const errorElement = input.nextElementSibling;

        if (isValid) {
          errorElement.textContent = "";
          errorElement.classList.remove(config.errorClass);
          input.classList.remove(config.inputErrorClass);
        } else {
          const errorMessage = input.validationMessage;
          errorElement.textContent = errorMessage;
          errorElement.classList.add(config.errorClass);
          input.classList.add(config.inputErrorClass);
        }

        // Verifica a validade de todos os inputs
        const isFormValid = Array.from(inputs).every((input) =>
          input.checkValidity()
        );
        formButton.disabled = !isFormValid;
      });
    });

    // Adiciona evento para resetar o formulário ao fechar
    const closeButton = formElement
      .closest(".popup__box")
      .querySelector(".popup__close-button");

    closeButton.addEventListener("click", () => {
      resetForm(formElement, config); // Chama a função de reset
    });
  });
}

function resetForm(formElement, config) {
  formElement.reset();
  const errorElements = formElement.querySelectorAll(".popup__error");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
  });
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });
  const formButton = formElement.querySelector(config.submitButtonSelector);
  formButton.disabled = true;
}

/*Estou enfrentando problemas nessa parte, sempre tenho esse erro:
Uncaught TypeError: Cannot read properties of null (reading 'querySelector')
    at validate.js:58:7
    at NodeList.forEach (<anonymous>)
    at enableValidation (validate.js:25:16)
    at validate.js:12:1

    Acho que se deve ao fato de eu ter "dividido" os formularios em dois arquivos e sempre acaba dando algum conflito
    em alguma das funcionalidades. Não sei se tem um jeito de corrigir isso ou talvez eu tenha que reformular todo meu codigo.

*/
