import AccountsService from '../api/accounts-service';

export class AccountsList {
  static inject () { return [AccountsService]; }
  constructor (AccountsService) {
    this.AccountsService = AccountsService;
  }
  activate (params, queryString, routeConfig) {
    this.loading = true;
    this.accounts = [];
    this.AccountsService.getAll(routeConfig.data.type)
      .then(accounts => this.accounts = accounts)
      .catch(() => {})
      .finally(() => this.loading = false);
  }
}
