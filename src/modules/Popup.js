export default class Popup {

    constructor() {
        this.editUserInfoForm = document.forms.edit;
        this.addCardPopupForm = document.forms.newPlace;
        this.avatarForm = document.forms.avatar;
    }

    open() {
        this.popup.classList.add('popup_is-opened');
        if (this.popup.id === 'new-place') {
        }

        if (this.popup.id === 'edit') {
            this.userInfo.setUserInfo();
            this.editUserInfoForm.querySelector('.popup__button').removeAttribute('disabled');
        }
    }

    close() {
        const addButton = document.querySelector('.popup__button_symb');
        const addError = this.addCardPopupForm.querySelectorAll('.error-message');
        const editError = this.editUserInfoForm.querySelectorAll('.error-message');
        const avatarError = this.avatarForm.querySelectorAll('.error-message');

        this.popup.classList.remove('popup_is-opened');
        if (this.popup.id === 'new-place') {
            addButton.setAttribute('disabled', true);
            this.addCardPopupForm.reset();
            addError.forEach(i => i.textContent = '');
        }

        if (this.popup.id === 'edit') {
            editError.forEach(i => i.textContent = '');
        }

        if (this.popup.id === 'avatar') {
            this.avatarForm.reset();
            avatarError.forEach(i => i.textContent = '');
        }
    }
}