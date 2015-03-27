import {Router} from 'aurelia-router';
import AccountsService from '../api/accounts-service';
import {EventAggregator} from 'aurelia-event-aggregator';

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
  static inject () { return [Router, EventAggregator, AccountsService]; }
  constructor (Router, EventAggregator, AccountsService) {
    this.router = Router;
    this.eventAggregator = EventAggregator;
    this.accountsService = AccountsService;
    this.statuses = STATUSES;

    this.router.configure(config => {
      config.map([
        {
          route: ['','users'],
          moduleId: 'accounts/account-users-list',
          nav: true,
          title: 'Users'
        },
        {
          route: ['channels'],
          moduleId: 'accounts/account-channels-list',
          nav: true,
          title: 'Channels'
        },
        {
          route: ['labels'],
          moduleId: 'accounts/account-labels-list',
          nav: true,
          title: 'Labels'
        },
        {
          route: ['rules'],
          moduleId: 'accounts/account-rules-list',
          nav: true,
          title: 'Rules'
        },
      ]);
    });
  }
  canActivate (params, queryString, routeConfig) {
    return new P((resolve, reject) => {
      this.accountsService
        .getById(params.id)
        .then(account => {
          this.account = account;
          this.eventAggregator.publish('account', account);
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
    this.accountsService
      .saveStatus(this.account, this.accountStatus)
      .then(account => this.accountStatus = account.status)
      .catch(err => this.accountStatus = this.account.status)
      .finally(() => this.statusLoading = false);
  }

  setTrialEndDate() {
    this.statusLoading = true;
    this.accountsService
      .saveTrialEndDate(this.account, this.accountTrialEndDate)
      .then(account => this.accountTrialEndDate = this.account.trialEndDate)
      .catch(err => this.accountTrialEndDate = this.account.trialEndDate)
      .finally(() => this.statusLoading = false);
  }
}
