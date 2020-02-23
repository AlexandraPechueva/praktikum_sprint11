class CardList {
    constructor(card, container) {
        this.card = card;
        this.container = container;
    }

    render(cards, initCards, userId) {
        const ownersId = [];
        const likes = [];
        initCards.forEach((item, i) => {
            cards.push(this.card.createCard(item.name, item.link, item.likes.length));
            ownersId[i] = item.owner._id;

            if (item.likes.length != 0) {
                likes[i] = item.likes.filter(likeItem => likeItem._id == userId).length > 0;
            }
        });

        cards.forEach((card, i) => {
            let deleteIcon = card.querySelector('.place-card__delete-icon');
            let likeIcon = card.querySelector('.place-card__like-icon');

            if (userId !== ownersId[i]) {
                deleteIcon.style.display = 'none';
            }

            if (likes[i]) {
                likeIcon.classList.toggle('place-card__like-icon_liked');
            }

            this.addCard(card)
        });
    }

    addCard(newCard) {
        this.container.appendChild(newCard);
    }
}
