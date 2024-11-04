export function enableValidation(config) {
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
        const isFormValid = Array.from(inputs).every((input) =>
          input.checkValidity()
        );
        formButton.disabled = !isFormValid;
      });
    });

    const closeButton = formElement
      .closest(".popup__box, .new__img-box")
      .querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
      resetForm(formElement, config);
    });
  });
}

export function resetForm(formElement, config) {
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
