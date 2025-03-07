export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._customErrors = new Map();
  }

  _showInputError(inputElement, message) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = message || inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    this._customErrors.set(inputElement.name, true);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    this._customErrors.delete(inputElement.name);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.value.trim().length === 0) {
      this._showInputError(inputElement, "Não pode ficar vazio");
      return false;
    }

    if (inputElement.type === "url") {
      const value = inputElement.value;
      const urlPattern =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

      if (!urlPattern.test(value)) {
        this._showInputError(
          inputElement,
          "Por favor, introduza uma URL válida"
        );
        return false;
      }

      if (
        !value.includes(".jpg") &&
        !value.includes(".jpeg") &&
        !value.includes(".png") &&
        !value.includes(".gif")
      ) {
        this._showInputError(
          inputElement,
          "A URL tem que ter um fortmato suportado (jpg, jpeg e png)"
        );
        return false;
      }
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    if (this._customErrors.size > 0) {
      return true;
    }

    return this._inputList.some((inputElement) => {
      const isOnlySpaces = inputElement.value.trim().length === 0;
      return !inputElement.validity.valid || isOnlySpaces;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
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
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._customErrors.clear();
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
