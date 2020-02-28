export default class Api {
    constructor(requestData) {
        this.requestData = requestData;
    }

    getUserInfo() {
        return fetch(`${this.requestData.address}/users/me`, {
            headers: {
                authorization: this.requestData.token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });

    }

    getInitCards() {
        return fetch(`${this.requestData.address}/cards`, {
            headers: {
                authorization: this.requestData.token
            }
        })

            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });
    }

    updateUserInfo() {
        this.editUserInfoForm = document.forms.edit;

        return fetch(`${this.requestData.address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.requestData.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.editUserInfoForm.userName.value,
                about: this.editUserInfoForm.userJob.value
            })
        })

            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });
    }

    renderLoading(isLoading, button) {
        if (isLoading) {
            if (button.classList.contains('popup__button_symb')) {
                button.classList.remove('popup__button_symb');
                button.classList.add('popup__button_text');
            }
            button.innerText = 'Загрузка...';
        }
        else {
            if (button.classList.contains('popup__button_text') &&
                (button.closest('form').name == "newPlace")) {
                button.classList.remove('popup__button_text');
                button.classList.add('popup__button_symb');

                button.innerText = '+';
            }
            else {
                button.innerText = 'Сохранить';
            }
        }

    }

    addCard() {
        this.addCardPopupForm = document.forms.newPlace
        return fetch(`${this.requestData.address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.requestData.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.addCardPopupForm.placeName.value,
                link: this.addCardPopupForm.link.value
            })
        })

            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });

    }

    updateUserAvatar() {
        this.avatarForm = document.forms.avatar;
        return fetch(`${this.requestData.address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.requestData.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: this.avatarForm.avatarLink.value,
            })
        })

            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this.requestData.address}/cards/${cardId}`, {
            method: 'Delete',
            headers: {
                authorization: this.requestData.token,
            },
        })

            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });

    }

    setLike(cardId) {
        return fetch(`${this.requestData.address}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.requestData.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });

    }


    deleteLike(cardId) {
        return fetch(`${this.requestData.address}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.requestData.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен', err);
            });

    }
}

