export default class LoginModal {
  show() {
    return new P((resolve, reject) => {
      var login = prompt('Votre login'),
        password = prompt('Votre mot de passe');

      resolve({login: login, password: password});
    });
  }
}
