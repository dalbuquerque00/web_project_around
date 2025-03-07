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
    this._isLiked = !this._isLiked;

    if (this._isLiked) {
      this._likeButton.style.backgroundImage =
        "url('../images/UIkit/like_black.png')"; // ativo
    } else {
      this._likeButton.style.backgroundImage =
        "url('../images/UIkit/like.svg')";
    }

    // Persistir o estado no localStorage
    localStorage.setItem(this._name, this._isLiked);
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

    this._isLiked = JSON.parse(localStorage.getItem(this._name)) || false;
    if (this._isLiked) {
      this._likeButton.style.backgroundImage =
        "url('../images/UIkit/like_black.png')";
    } else {
      this._likeButton.style.backgroundImage = "url('./images/UIkit/like.svg')";
    }

    this._setEventListeners();
    return this._element;
  }
}
