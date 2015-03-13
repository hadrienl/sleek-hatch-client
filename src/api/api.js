import {HttpClient} from 'aurelia-http-client';

export default class Api {
  static inject () { return [HttpClient]; }

  constructor(http){
    this.http = http;
  }

  request (method, path, params) {
    return new P((resolve, reject) => {
      this.http.request
        [method](path, params)
        .then(data => {
          if ((''+data.statusCode)[0] === '2') {
            resolve(data.content);
          } else {
            reject(data.statusText || data.statusCode);
          }
        })
        .catch(err => reject(err));
    });
  }
}
