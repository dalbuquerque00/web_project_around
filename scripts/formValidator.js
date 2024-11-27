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
          input.classList.remove(config.inputErrorClass);
        } else {
          errorElement.textContent = input.validationMessage;
          input.classList.add(config.inputErrorClass);
        }

        formButton.disabled = !Array.from(inputs).every((input) =>
          input.checkValidity()
        );
      });
    });
  });
}
