export default class UserInfo {
    constructor(name, job) {
        this.name = name;
        this.job = job;
        this.editUserInfoForm = document.forms.edit;
    }

    setUserInfo() {
        this.editUserInfoForm.userName.value = this.name;
        this.editUserInfoForm.userJob.value = this.job;
    }

    updateUserInfo() {
        document.querySelector('.user-info__name').textContent = this.editUserInfoForm.userName.value;
        document.querySelector('.user-info__job').textContent = this.editUserInfoForm.userJob.value;
        this.name = this.editUserInfoForm.userName.value;
        this.job = this.editUserInfoForm.userJob.value;
    }




}
