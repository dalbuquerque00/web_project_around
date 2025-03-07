import { settings } from "../utils/config.js";

export default class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner;
    this._isLiked = data.isLiked;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeView();
  }

  _updateLikeView() {
    if (this._isLiked) {
      this._likeImage.src = settings.cardLikeActiveImage;
    } else {
      this._likeImage.src = settings.cardLikeInactiveImage;
    }
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__item-button");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._cardImage = this._element.querySelector(".elements__item-image");
    this._likeImage = this._element.querySelector(".elements__item-like");

    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () =>
        this._handleDeleteClick(this)
      );
    }
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".elements__item-image");
    const cardTitle = this._element.querySelector(".elements__item-title");

    if (this._ownerId !== this._userId) {
      const deleteButton = this._element.querySelector(".elements__delete");
      if (deleteButton) {
        deleteButton.remove();
      }
    }

    cardImage.src = this._link;
    cardImage.alt = `Imagem de ${this._name}`;
    cardTitle.textContent = this._name;

    this._updateLikeView();

    return this._element;
  }
}
