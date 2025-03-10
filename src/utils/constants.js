export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const profileSelectors = {
  nameElement: ".profile__info-title",
  jobElement: ".profile__info-subtitle",
  avatarElement: ".profile__avatar",
  avatarEdit: ".profile__avatar-edit",
  editButton: ".profile__edit-icon",
  addButton: ".button-add",
};

export const popupSelectors = {
  editPopup: ".popup_edit",
  addPopup: ".popup_add",
  imagePopup: ".popup_image",
  deletePopup: ".popup_delete-card",
  avatarPopup: ".popup_avatar",
  editForm: "#edit_form",
  addForm: "#add_form",
  deleteForm: "#delete_form",
  avatarForm: "#avatar_form",
  nameInput: ".popup__input_name",
  jobInput: ".popup__input_job",
};

export const cardSelectors = {
  template: "#card-template",
  container: ".elements",
};

export const forms = {
  editForm: document.querySelector("#edit_form"),
  addForm: document.querySelector("#add_form"),
  deleteForm: document.querySelector("#delete_form"),
  avatarForm: document.querySelector("#avatar_form"),
};

export const editProfileElements = {
  form: forms.editForm,
  nameInput: document.querySelector(".popup__input_name"),
  jobInput: document.querySelector(".popup__input_job"),
  submitButton: forms.editForm?.querySelector(".popup__button"),
};

export const addCardElements = {
  form: forms.addForm,
  titleInput: document.querySelector(".popup__input_title"),
  linkInput: document.querySelector(".popup__input_link"),
  submitButton: forms.addForm?.querySelector(".popup__button"),
};
