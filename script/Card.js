class Card {
    constructor() {
        addEventListener('click', this.getImage);
    }

    createCard(cardName, cardLink, likesCount) {
        const card = document.createElement('div');
        card.classList.add('place-card');

        card.insertAdjacentHTML('beforeend', `
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="place-card__like-container">
                <button class="place-card__like-icon"></button>
                <div class="place-card__like-count"></div>
            </div>
        </div>`);

        card.querySelector('.place-card__name').textContent = cardName;
        card.querySelector('.place-card__image').style.backgroundImage = `url(${cardLink})`;
        card.querySelector('.place-card__like-count').textContent = likesCount;

        return card;
    }

    remove(event) {
        const container = document.querySelector('.places-list');
        container.removeChild(event.target.closest('.place-card'));
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    getImage(event) {
        event.stopPropagation();
        if (!(event.target.classList.contains('popup__image'))) {
            const imageContainer = document.querySelector('.popup__image');
            const image = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            imageContainer.setAttribute("src", image);
        }
    }

}