import {EventAggregator} from 'aurelia-event-aggregator';

export class AccountUsersList {
  static inject () { return [EventAggregator]; }
  constructor (EventAggregator) {
    this.eventAggregator = EventAggregator;
    this.eventAggregator.subscribe('account', account => this.setAccount(account));
  }

  setAccount (account) {
    this.account = account;
    this.loading = true;
    this.users = this.account.users;
    this.users.promise.finally(() => this.loading = false);
  }
}
