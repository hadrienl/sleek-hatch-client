export default class LoginModal {
  show() {
    return new P((resolve, reject) => {
      var login = prompt('Votre login'),
        password = prompt('Votre mot de passe');

      if (login && password) {
        resolve({login: login, password: password});
      } else {
        reject();
      }
    });
  }
}
