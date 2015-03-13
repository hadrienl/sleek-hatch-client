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
      if (!sessionStorage.auth) {
        this._tryToLogin(method, path, params, resolve, reject);
      }
      this.http.request
        .withHeader('Authorization', `basic ${sessionStorage.auth}`)
        .withHeader('Content-type', 'application/json, text/plain')
        [method](
          `//coincoin.sandbox.sleekapp.io/admin${path}`,
          params)
        .then(data => {
          if ((''+data.statusCode)[0] === '2') {
            resolve(data.content);
          } else {
            reject(data.statusText || data.statusCode);
          }
        })
        .catch(err => {
          if (401 === err.statusCode) {
            return this._tryToLogin(method, path, params, resolve, reject);
          }
          reject(err);
        });
    });
  }

  _tryToLogin(method, path, params, resolve, reject) {
    return this.LoginModal
      .show()
      .then(credentials => {
        this.login(credentials.login, credentials.password);
        return this.request(method, path, params)
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
      .catch(() => reject(err));
  }
}
