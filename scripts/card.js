export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._isLiked = JSON.parse(localStorage.getItem(this._name)) || false;
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
      this._handleCardClick({ link: this._link, name: this._name })
    );
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._deleteButton.addEventListener("click", () => this._deleteCard());
  }

  // Alterna o estado do like
  _toggleLike() {
    this._isLiked = !this._isLiked; // para alterar  estado de like
    this._likeButton.classList.toggle("element__like_active", this._isLiked);
  }

  // Deleta o cartão
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash-icon");

    // Pdados do cartão
    this._element.querySelector(".element__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Estado do likee
    if (this._isLiked) {
      this._likeButton.classList.add("element__like_active");
    }

    this._setEventListeners(); // Configura os listeners

    return this._element;
  }
}
