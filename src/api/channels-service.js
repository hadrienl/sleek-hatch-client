import Api from './api';

export default class ChannelsService extends Api {
  getFromAccount (account) {
    return new P((resolve, reject) => {
      this.request('get', `/admin/accounts/${account.id || account}/channels`)
        .then(data => {
          console.log(data);
        })
        .catch(err => reject(`Cannot get channels for account #${account.id || account}`));
    });
  }

  getAll(type = '') {
    return new P((resolve, reject) => {
      this.request('get', `/accounts?status=${type}`)
        .then(data => {
          var accounts = [];
          data.accounts.forEach (data => accounts.push(new AccountModel(data)));
          resolve(accounts);
        })
        .catch(err => reject(err));
    });
  }

  getById(id) {
    return new P((resolve, reject) => {
      this.request('get', `/accounts/${id}`)
        .then(data => resolve(new AccountModel(data)))
        .catch(err => reject(err));
    });
  }

  getUsers (id) {
    return new P((resolve, reject) => {
      this.request('get', `/accounts/${id}/users`)
        .then(data => resolve(data.map(userData => new UserModel(userData))))
        .catch(err => reject(err));
    });
  }

  saveStatus (account, status) {
    return new P((resolve, reject) => {
      this.request('patch', `/accounts/${account.id}/status`, {
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
      this.request('patch', `/accounts/${account.id}/trial_end_date`, {
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
