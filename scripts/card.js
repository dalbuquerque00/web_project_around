export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash-icon");
    this._titleElement = this._element.querySelector(".element__name");

    // Preenchendo o card
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // Adicionando eventos
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    // Expansão de imagem
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });

    // Botão de curtida
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like_active");
    });

    // Exclusão de card
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }
}
