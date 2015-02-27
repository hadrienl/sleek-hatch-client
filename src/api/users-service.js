import Api from './api';
import UserModel from './user-model';

export default class UsersService extends Api {
  getAll() {
    return new Promise((resolve, reject) => {
      this.request('get', '/mocks/users.json')
        .then(data => {
          var users = [];
          data.forEach (data => users.push(new UserModel(data)));
          resolve(users);
        })
        .catch(err => reject(err));
    });
  }
}
