import {Router} from 'aurelia-router';

export class Accounts {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Accounts';
      config.map([
        {
          route: ['','trial'],
          moduleId: 'accounts/accounts-list',
          nav: true,
          title: 'Trial',
          data: {
            type: 'trial'
          }
        },
        {
          route: ['trial-over'],
          moduleId: 'accounts/accounts-list',
          nav: true,
          title: 'Trial over',
          data: {
            type: 'trial-over'
          }
        },
        {
          route: ['live'],
          moduleId: 'accounts/accounts-list',
          nav: true,
          title: 'Live',
          data: {
            type: 'live'
          }
        },
        {
          route: ['closed'],
          moduleId: 'accounts/accounts-list',
          nav: true,
          title: 'Closed',
          data: {
            type: 'closed'
          }
        }
      ]);
    });
  }
}
