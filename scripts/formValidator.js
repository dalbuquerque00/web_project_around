export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleButtonState() {
    const isValid = this._inputList.every((input) => input.validity.valid);
    this._submitButton.disabled = !isValid;
    this._submitButton.classList.toggle(
      this._config.inactiveButtonClass,
      !isValid
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
