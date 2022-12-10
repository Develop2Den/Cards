export default class SignIn {
    bgContainer = document.createElement('div');
    container = document.createElement('div');
    btnClose = document.createElement('i');
    title = document.createElement('h2');
    loginLabel = document.createElement('label');
    loginInput = document.createElement('input');
    passwordLabel = document.createElement('label');
    passwordInput = document.createElement('input');
    error = document.createElement('p');
    btnSignIn = document.createElement('button');
    createContainer() {
        this.bgContainer.classList.add('sign-in__bg');
        this.container.classList.add('modal__sign-in');
    }
    createBtnClose() {
        this.btnClose.innerHTML = '&#10006;';
        this.btnClose.classList.add('sign-in--close');
    }
    createTitle() {
        this.title.innerText = 'Sign in';
        this.title.classList.add('modal-title');
    }
    createInputs() {
        this.loginLabel.setAttribute('for', 'login');
        this.loginLabel.innerHTML = 'Email <span>*</span>';
        this.loginLabel.classList.add('modal');
        this.loginInput.type = 'email';
        this.loginInput.name = 'email';
        this.loginInput.placeholder = 'Enter your email';
        this.loginInput.id = 'sign-in--login';
        this.loginInput.classList.add('modal');

        this.passwordLabel.setAttribute('for', 'password');
        this.passwordLabel.innerHTML = 'Password <span>*</span>';
        this.passwordLabel.classList.add('modal');
        this.passwordInput.type = 'password';
        this.passwordInput.name = 'password';
        this.passwordInput.placeholder = 'Enter your password';
        this.passwordInput.id = 'sign-in--password';
        this.passwordInput.classList.add('modal');
    }
    createError() {
        this.error.innerText = 'Incorrect email or password';
        this.error.id = 'sign-in--fail';
    }
    createBtnSignIn() {
        this.btnSignIn.innerText = 'Sign in';
        this.btnSignIn.classList.add('btn__sign-in');
    }
    render() {
        this.createContainer();
        this.createBtnClose();
        this.createTitle();
        this.createInputs();
        this.createError();
        this.createBtnSignIn();

        this.container.append(this.btnClose,
            this.title,
            this.loginLabel,
            this.loginInput,
            this.passwordLabel,
            this.passwordInput,
            this.error,
            this.btnSignIn);
        this.bgContainer.append(this.container)
        document.body.append(this.bgContainer);
    }
}