class FormValidator {
    constructor(form, error) {

        this.form = form;
        this.inputs = [...this.form.getElementsByTagName("input")];
        this.error = error;

        if (this.form.name == 'newPlace' || this.form.name == 'avatar') {
            this.isValid = Array(this.inputs.length).fill(false);
        }

        if (this.form.name == 'edit') {
            this.isValid = Array(this.inputs.length).fill(true);
        }
    }

    showError(target) {
        target.closest('.input-container').classList.add('input-container__invalid');
    }

    checkInputValidity(input, event) {
        if (input.validity.valueMissing) {
            event.target.closest('.input-container').querySelector('.error-message').textContent = this.error.required;
            this.showError(event.target);
            return;
        }
        if ((input.validity.tooShort || input.validity.tooLong) && input.type !== 'url') {
            event.target.closest('.input-container').querySelector('.error-message').textContent = this.error.textLength;
            this.showError(event.target);
            return;
        } if (input.validity.typeMismatch) {
            event.target.closest('.input-container').querySelector('.error-message').textContent = this.error.needURL;
            this.showError(event.target);
        }
        else {
            event.target.closest('.input-container').querySelector('.error-message').textContent = '';
            event.target.closest('.input-container').classList.remove('input-container__invalid');

            return true;
        }

        return false;
    }

    setSubmitButtonState(event) {
        const button = this.form.querySelector('.popup__button');

        this.inputs.forEach((input, i) => {
            if (event.target == input) {
                this.isValid[i] = this.checkInputValidity(input, event);
            }
        });

        if (this.isValid.every(i => { return i === true })) {
            button.removeAttribute('disabled');
        }
        else {
            button.setAttribute('disabled', true)
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    }
}
