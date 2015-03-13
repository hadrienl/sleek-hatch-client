import {HttpClient} from 'aurelia-http-client';
import LoginModal from './login-modal';

export default class Api {
  static inject () { return [HttpClient, LoginModal]; }

  constructor(http, LoginModal){
    this.http = http;
    this.LoginModal = LoginModal;
  }

  login (_login, password) {
    sessionStorage.auth = btoa(`${_login}:${password}`);
  }

  request (method, path, params) {
    return new P((resolve, reject) => {
      this.http.request
        .withHeader('Authorization', `basic ${sessionStorage.auth}`)
        [method](`//coincoin.sandbox.sleekapp.io/admin${path}`, params)
        .then(data => {
          if ((''+data.statusCode)[0] === '2') {
            resolve(data.content);
          } else {
            reject(data.statusText || data.statusCode);
          }
        })
        .catch(err => {
          this.hash = null;
          this.LoginModal
            .show()
            .then(credentials => {
              this.login(credentials.login, credentials.password);
              return this.request(method, path, params)
                .then(data => resolve(data))
                .catch(err => reject(err));
            })
            .catch(() => reject(err));
        });
    });
  }
}
