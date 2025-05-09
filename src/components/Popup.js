import { settings } from "../utils/config.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(settings.popupOpenedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(settings.popupOpenedClass);
    this._popup.classList.remove(settings.imagePopupClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(settings.popupOpenedClass) ||
        evt.target.classList.contains(settings.imagePopupClass) ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
