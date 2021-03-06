import Api from './api';
import AccountModelFactory from './account-model';
import UserModelFactory from './user-model';

export default class AccountsService {
  static inject() { return [Api, AccountModelFactory, UserModelFactory]; }
  constructor(Api, AccountModelFactory, UserModelFactory) {
    this.api = Api;
    this.AccountModelFactory = AccountModelFactory;
    this.UserModelFactory = UserModelFactory;
  }

  getAll(type = '') {
    return new P((resolve, reject) => {
      this.api.request('get', `/accounts?status=${type}`)
        .then(data => {
          var accounts = [];
          data.accounts.forEach (data => accounts.push(this.AccountModelFactory.create(data)));
          resolve(accounts);
        })
        .catch(err => reject(err));
    });
  }

  getById(id) {
    return new P((resolve, reject) => {
      this.api.request('get', `/accounts/${id}`)
        .then(data => resolve(this.AccountModelFactory.create(data)))
        .catch(err => reject(err));
    });
  }

  getUsers (id) {
    return new P((resolve, reject) => {
      this.api.request('get', `/accounts/${id}/users`)
        .then(data => resolve(data.map(userData => this.UserModelFactory.create(userData))))
        .catch(err => reject(err));
    });
  }

  saveStatus (account, status) {
    return new P((resolve, reject) => {
      this.api.request('patch', `/accounts/${account.id}/status`, {
          status: status
        })
        .then(data => {
          account.status = status;
          resolve(account);
        })
        .catch(err => reject(err));
    });
  }

  saveTrialEndDate (account, date) {
    return new P((resolve, reject) => {
      this.api.request('patch', `/accounts/${account.id}/trial_end_date`, {
          trial_end_date: date
        })
        .then(data => {
          account.trialEndDate = new Date(date);
          resolve(account);
        })
        .catch(err => reject(err));
    });
  }
}
