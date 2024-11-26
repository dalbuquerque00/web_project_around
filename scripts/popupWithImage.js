import Popup from "./popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".element__image-main");
    this._popupTitle = this._popupElement.querySelector(".element__image-name");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const closeButton = this._popupElement.querySelector(
      "#expand__popup-close"
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    } else {
      console.error("Sem botão.");
    }
  }
}
