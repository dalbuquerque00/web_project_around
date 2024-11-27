export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // Função para abrir o popup de visualização
  }

  // Método para buscar o template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Método para criar o card
  generateCard() {
    this._element = this._getTemplate(); // Cria uma cópia do template
    this._imageElement = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash-icon");
    this._titleElement = this._element.querySelector(".element__name");

    // Configurando os valores dinâmicos
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // Configura os eventos
    this._setEventListeners();

    return this._element;
  }

  // Método para adicionar os eventos
  _setEventListeners() {
    // Evento para abrir o popup de visualização ao clicar na imagem
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });

    // Evento para excluir o card
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    // Evento para alternar "like"
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like_active");
    });
  }

  // Método para excluir o card
  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // Remove a referência para liberar memória
  }
}
