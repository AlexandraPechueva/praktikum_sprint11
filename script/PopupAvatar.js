class PopupAvatar extends Popup {
    constructor() {
        super();

        this.popup = document.getElementById('avatar');
        this.popupOpenButton = document.querySelector('.user-info__photo');
        this.popupCloseButton = this.popup.querySelector('.popup__close');

        this.popupOpenButton.addEventListener('click', this.open.bind(this));
        this.popupCloseButton.addEventListener('click', this.close.bind(this));
    }
} 