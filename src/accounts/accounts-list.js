import AccountsService from '../api/accounts-service';

export class AccountsList {
  static inject () { return [AccountsService]; }
  constructor (AccountsService) {
    this.AccountsService = AccountsService;
    this.accounts = [];
  }
  activate (params, queryString, routeConfig) {
    this.AccountsService.getAll(routeConfig.data.type)
      .then(accounts => this.accounts = accounts);
  }
}
