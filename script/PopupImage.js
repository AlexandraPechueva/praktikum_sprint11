class PopupImage extends Popup {
    constructor() {
        super();

        this.popup = document.getElementById('big-photo');
        this.popupCloseButton = this.popup.querySelector('.popup__close');

        this.popupCloseButton.addEventListener('click', this.close.bind(this));
    }
} 