export function openPopup(popup) {
  popup.classList.add("popup_opened");

  function handleEscClose(event) {
    if (event.key === "Escape") {
      closePopup(popup);
      document.removeEventListener("keydown", handleEscClose);
    }
  }

  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export const selectors = {
  popupEdit: document.querySelector("#popup-edit"),
  popupImage: document.querySelector(".element__image-popup"),
  formEditProfile: document.querySelector("#form-edit-profile"),
  formAddCard: document.querySelector("#form-add-card"),
};
