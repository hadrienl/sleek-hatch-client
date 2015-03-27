import {Behavior} from 'aurelia-templating';
import AccountsService from '../api/accounts-service';

export class AccountUsersCustomElement {
  static metadata(){
    return Behavior
      .withProperty('account');
  }

  static inject() { return [AccountsService]; }

  constructor(AccountsService) {
    this.AccountsService = AccountsService;
  }

  accountChanged () {
    this.loadUsers();
  }

  loadUsers() {
    if (this.users) {
      return;
    }
    this.AccountsService
      .getUsers(this.account.id)
      .then(users => this.users = users)
      .catch(err => console.log(err));
  }
}
