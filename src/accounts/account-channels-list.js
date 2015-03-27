import {EventAggregator} from 'aurelia-event-aggregator';

export class AccountChannelsList {
  static inject () { return [EventAggregator]; }
  constructor (EventAggregator) {
    this.eventAggregator = EventAggregator;
    this.eventAggregator.subscribe('account', account => this.setAccount(account));
    this.channels = [];
  }

  setAccount (account) {
    this.account = account;
    this.loading = true;
    this.channels = this.account.channels;
    this.channels.promise.finally(() => this.loading = false);
  }
}
