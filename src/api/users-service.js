import {HttpClient} from 'aurelia-http-client';

export default class UsersService {
  static inject() { return [HttpClient]; }

  constructor(http){
    this.http = http;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get('/mocks/users.json')
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
