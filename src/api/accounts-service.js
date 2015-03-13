import Api from './api';
import AccountModel from './account-model';

export default class AccountsService extends Api {
  getAll(type = '') {
    return new P((resolve, reject) => {
      this.request('get', `http://coincoin.sandbox.sleekapp.io/admin/accounts?status=${type}`)
        .then(data => {
          var accounts = [];
          data.accounts.forEach (data => accounts.push(new AccountModel(data)));
          resolve(accounts);
        })
        .catch(err => reject(err));
    });
  }
}
