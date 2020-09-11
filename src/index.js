import './pages/index.css';
import Api from './modules/Api.js';
import Card from './modules/Card.js';
import CardList from './modules/CardList.js';
import FormValidator from './modules/FormValidator.js';
import PopupAvatar from './modules/PopupAvatar.js';
import PopupCard from './modules/PopupCard.js';
import PopupImage from './modules/PopupImage.js';
import PopupProfile from './modules/PopupProfile.js';
import UserInfo from './modules/UserInfo';

(function () {
    let userInfo;
    let popupProfile;
    let userId = '';

    const cards = [];
    const card = new Card();
    const cardsContainer = document.querySelector('.places-list');
    const cardList = new CardList(card, cardsContainer);


    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const userInfoPhoto = document.querySelector('.user-info__photo');

    const popupCard = new PopupCard();
    const popupImage = new PopupImage();
    const popupAvatar = new PopupAvatar();

    const rootContainer = document.querySelector('.root');
    let myCards = [];
    let allCards = [];

    // const serverUrl = NODE_ENV === "development" ? "http://praktikum.tk/cohort7" : "https://praktikum.tk/cohort7";
    const serverUrl = NODE_ENV === "development" ? "https://nomoreparties.co/cohort7" : "https://nomoreparties.co/cohort7";

    const requestData = {
        address: serverUrl,
        token: '9f9195c9-a467-4a37-897c-2baf9bb42b3e'
    }

    const api = new Api(requestData);

    const error = {
        required: 'Это обязательное поле',
        textLength: 'Должно быть от 2 до 30 символов',
        needURL: 'Здесь должна быть ссылка'
    };

    const editUserInfoForm = document.forms.edit;
    const addCardPopupForm = document.forms.newPlace;
    const newAvatarForm = document.forms.avatar;

    const newPlaceForm = new FormValidator(addCardPopupForm, error);
    const editForm = new FormValidator(editUserInfoForm, error);
    const avatarForm = new FormValidator(newAvatarForm, error)

    api.getUserInfo()
        .then(result => {
            userId = result._id;
            userInfoName.textContent = result.name;
            userInfoJob.textContent = result.about;
            userInfoPhoto.style.backgroundImage = `url(${result.avatar})`;
        })
        .then(() => {
            userInfo = new UserInfo(userInfoName.textContent, userInfoJob.textContent);
        })
        .then(() => {
            popupProfile = new PopupProfile(userInfo);

        })

    function getInitCards() {
        api.getInitCards()
            .then(result => {
                allCards = result.slice();
                cardList.render(cards, result, userId);
                myCards = result.filter(item => item.owner._id == userId);
            });
    }

    getInitCards();

    function addCardHandler(event) {
        const button = document.querySelector('.popup__button_symb');
        event.preventDefault();
        api.renderLoading(true, button);

        setTimeout(() => {
            api.addCard()
                .then(result => {
                    const newCard = card.createCard(result.name, result.link, 0);
                    cardList.addCard(newCard);
                    getInitCards();
                    api.renderLoading(false, button);
                })
                .then(() => {
                    addCardPopupForm.reset();
                    popupCard.close();
                })
        }, 1000);
    }

    function isPopupOpen(event) {
        let currentPopup = null;

        if (event.type === "keydown") {
            const root = Array.from(rootContainer.children);
            root.forEach(item => {
                if (item.classList.contains('popup_is-opened')) {
                    currentPopup = item;
                }
            })
        }
        else {
            if (!event.target.classList.contains('popup__content')) {
                currentPopup = event.target;
            }
        }

        if (currentPopup !== null && currentPopup.classList.contains('popup')) {
            if (currentPopup.id === 'new-place') currentPopup = popupCard;
            if (currentPopup.id === 'edit') currentPopup = popupProfile;
            if (currentPopup.id === 'avatar') currentPopup = popupAvatar;
            if (currentPopup.id === 'big-photo') currentPopup = popupImage;
            currentPopup.close();
        }

    }

    document.onkeydown = function (event) {
        if (event.key === "Escape") {
            isPopupOpen(event);
        }
    }

    function cardsActionsHandler(event) {
        if (event.target.classList.contains('place-card__delete-icon')
            && window.confirm('Вы действительно хотите удалить эту карточку?')) {
            event.stopPropagation()

            const cardLink = event.target.closest('.place-card__image').style.backgroundImage.slice(4, -1).replace(/"/g, "");

            const cardToDelete = myCards.filter(item => item.link === cardLink)[0]._id;
            api.deleteCard(cardToDelete);

            card.remove(event);
        }

        if (event.target.classList.contains('place-card__like-icon')) {
            const likedCardLink = event.target.closest('.place-card').querySelector('.place-card__image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const cardToLike = allCards.filter(item => item.link == likedCardLink)[0]._id;

            if (!event.target.classList.contains('place-card__like-icon_liked')) {
                api.setLike(cardToLike)
                    .then(result => {
                        event.target.nextElementSibling.textContent = result.likes.length;
                    });
                card.like(event);
            }
            else {
                api.deleteLike(cardToLike)
                    .then(result => {
                        event.target.nextElementSibling.textContent = result.likes.length;
                    })
                card.like(event);

            }

        }

        if (event.target.classList.contains('place-card__image')) {
            popupImage.open();
        }
    }

    function saveUserInfoHandler(event) {
        const popupUserInfo = document.getElementById('edit');
        const button = popupUserInfo.querySelector('.popup__button_text');

        event.preventDefault();
        api.renderLoading(true, button);
        setTimeout(() =>
            api.updateUserInfo()
                .then(() => {
                    userInfo.updateUserInfo();
                })
                .then(() => popupProfile.close())
                .then(() => {
                    userInfo.name = editUserInfoForm.userName.value;
                    userInfo.job = editUserInfoForm.userJob.value;
                    api.renderLoading(false, button);

                }), 1000);
    }

    function updateUserAvatarHandler(event) {
        const popupNewAvatar = document.getElementById('avatar');
        const button = popupNewAvatar.querySelector('.popup__button_text');

        event.preventDefault();
        api.renderLoading(true, button);

        setTimeout(() =>
            api.updateUserAvatar()
                .then(result => {
                    userInfoPhoto.style.backgroundImage = `url(${result.avatar})`;
                    api.renderLoading(false, button);

                })
                .then(() => {
                    popupAvatar.close()
                })
            , 1000);
    }


    cardsContainer.addEventListener('click', cardsActionsHandler);

    rootContainer.addEventListener('click', isPopupOpen);

    document.forms.newPlace.addEventListener('submit', addCardHandler);

    document.forms.edit.addEventListener('submit', saveUserInfoHandler);

    document.forms.avatar.addEventListener('submit', updateUserAvatarHandler)

    newPlaceForm.setEventListeners();
    editForm.setEventListeners();
    avatarForm.setEventListeners()
})();
