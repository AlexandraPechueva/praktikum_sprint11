class PopupCard extends Popup {
    constructor() {
        super();

        this.popup = document.getElementById('new-place');
        this.popupOpenButton = document.querySelector('.user-info__button');
        this.popupCloseButton = this.popup.querySelector('.popup__close');

        this.popupOpenButton.addEventListener('click', this.open.bind(this));
        this.popupCloseButton.addEventListener('click', this.close.bind(this));
    }
} 