import Api from './api';
import AccountModel from './account-model';

export default class AccountsService extends Api {
  getAll(type = '') {
    return new Promise((resolve, reject) => {
      this.request('get', `/mocks/accounts${type && '-' + type}.json`)
      //this.request('get', `http://coincoin.sandbox.sleekapp.io/admin/accounts?status=${type}`)
        .then(data => {
          var accounts = [];
          data.accounts.forEach (data => accounts.push(new AccountModel(data)));
          resolve(accounts);
        })
        .catch(err => reject(err));
    });
  }
}
