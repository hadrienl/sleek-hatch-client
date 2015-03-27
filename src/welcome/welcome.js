import AccountService from '../api/accounts-service';

export class Welcome{
  static inject () { return [AccountService]; }
  constructor (AccountService) {
    AccountService.getAll()
      .then(accounts => console.log(accounts));
  }
}
