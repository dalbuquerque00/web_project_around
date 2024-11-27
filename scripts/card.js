export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._deleteButton.addEventListener("click", () => this._deleteCard());
  }

  _toggleLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash-icon");

    this._element.querySelector(".element__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

// Segui as dicas do instrutor, os erros vinham por conta de uma falha no css. Mas depois de ajeitar e revisar a materia eu consegui fazer
