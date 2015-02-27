import {HttpClient} from 'aurelia-http-client';

export default class Api {
  static inject () { return [HttpClient]; }

  constructor(http){
    this.http = http;
  }

  request (method, path, params) {
    return new Promise((resolve, reject) => {
      this.http[method](path, params)
        .then(data => {
          try {
            data = JSON.parse(data.response);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        })
        .catch(err => reject(err));
    });
  }
}
