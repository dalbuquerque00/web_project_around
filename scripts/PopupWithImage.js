import PopUp from "./Popup.js";

export default class PopupWithImage extends PopUp {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".element__image-main");
    this._caption = this._popup.querySelector(".element__image-name");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
