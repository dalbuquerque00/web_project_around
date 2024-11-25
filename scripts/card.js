export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Método privado para obter o template do cartão
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  // Método privado para adicionar os ouvintes de eventos
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => this._handleLikeClick());

    this._element
      .querySelector(".element__trash-icon")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  // Método privado para alternar o estado do botão de curtida
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like_active");
  }

  // Método privado para excluir o cartão
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Método público para criar o cartão
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");

    this._element.querySelector(".element__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
