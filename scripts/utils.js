export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

export function closePopupOnOutsideClick(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("popup_opened") ||
      event.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
