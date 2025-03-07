// Popup.js
import { resetForm } from "./Utils.js";

export default class PopUp {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    resetForm(this._popup); // resetar formulario
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Adiciona o evento de clique no botão de fechar
    const closeButton = this._popup.querySelector(".popup__close-button");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    }

    // Evento de clique fora do conteúdo também
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target === closeButton
      ) {
        this.close();
      }
    });
  }
}
