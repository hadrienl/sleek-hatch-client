import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'The Hatch';
      config.options.pushState = true;
      config.map([
        {
          route: ['','welcome'],
          moduleId: 'welcome/welcome'
        },
        {
          route: 'users',
          moduleId: 'users/users',
          nav: true,
          title: 'Users'
        },
        {
          route: 'accounts',
          moduleId: 'accounts/accounts',
          nav: true,
          title: 'Accounts'
        },
        {
          route: 'channels',
          moduleId: 'channels/channels',
          nav: true,
          title: 'Channels'
        }
      ]);
    });
  }
}
