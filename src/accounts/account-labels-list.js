import {EventAggregator} from 'aurelia-event-aggregator';

export class AccountLabelsList {
  static inject () { return [EventAggregator]; }
  constructor (EventAggregator) {
    this.eventAggregator = EventAggregator;
    this.eventAggregator.subscribe('account', account => this.setAccount(account));
    this.labels = [];
  }

  setAccount (account) {
    this.account = account;
    this.labels = this.account.labels;
  }
}
