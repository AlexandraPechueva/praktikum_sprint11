import Popup from './Popup.js';

export default class PopupProfile extends Popup {
    constructor(userInfo) {
        super();

        this.userInfo = userInfo;
        this.popup = document.getElementById('edit');
        this.popupOpenButton = document.querySelector('.user-info__edit');
        this.popupCloseButton = this.popup.querySelector('.popup__close');

        this.popupOpenButton.addEventListener('click', this.open.bind(this));
        this.popupCloseButton.addEventListener('click', this.close.bind(this));
    }
} 