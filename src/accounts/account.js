import AccountsService from '../api/accounts-service';

const STATUSES = [{
  label: 'Live',
  value: 'live',
}, {
  label: 'Trial',
  value: 'trial'
}, {
  label: 'Trial over',
  value: 'trial_over'
}, {
  label: 'Closed',
  value: 'closed'
}];

export default class Account {
  static inject () { return [AccountsService]; }
  constructor (AccountsService) {
    this.AccountsService = AccountsService;
    this.statuses = STATUSES;
  }
  canActivate (params, queryString, routeConfig) {
    return new P((resolve, reject) => {
      this.AccountsService
        .getById(params.id)
        .then(account => {
          this.account = account;
          /*routeConfig.title = account.name;
          console.log(routeConfig);*/
          resolve(true);
        })
        .catch(err => reject(err));
    });
  }
  activate () {
    this.goBack = () => history.back();

    this.accountStatus = this.account.status;
    this.accountTrialEndDate = this.account.trialEndDate;
  }

  setStatus() {
    this.statusLoading = true;
    this.AccountsService
      .saveStatus(this.account, this.accountStatus)
      .then(account => this.accountStatus = account.status)
      .catch(err => this.accountStatus = this.account.status)
      .finally(() => this.statusLoading = false);
  }

  setTrialEndDate() {
    this.statusLoading = true;
    this.AccountsService
      .saveTrialEndDate(this.account, this.accountTrialEndDate)
      .then(account => this.accountTrialEndDate = this.account.trialEndDate)
      .catch(err => this.accountTrialEndDate = this.account.trialEndDate)
      .finally(() => this.statusLoading = false);
  }
}
