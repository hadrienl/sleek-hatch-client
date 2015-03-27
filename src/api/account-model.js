import Api from './api';
import ModelFactory from './model';
import UserModelFactory from './user-model';
//import ChannelsService from './channels-service';

const USERS = Symbol(),
  CHANNELS = Symbol();

class AccountModel extends ModelFactory.Model() {
  static properties () { return {
    id: null,
    name: null,
    subdomain: null,
    status: null,
    createdAt: {
      from: 'created_at',
      type: Date
    },
    usersCount: {
      from: 'users_count',
      type: Number
    },
    channelsCount: {
      from: 'channels_count',
      type: Number
    },
    lifetimeMessages: {
      from: 'lifetime_messages',
      type: Number
    },
    thirtyDaysMessages: {
      from: 'thirty_days_messages',
      type: Number
    },
    sevenDaysMessages: {
      from: 'seven_days_messages',
      type: Number
    },
    thirtyDaysEstimate: {
      from: 'thirty_days_estimate',
      type: Number
    },
    averageMessagesPerMonth: {
      from: 'average_messages_per_month',
      type: Number
    },
    inboxCount: {
      from: 'inbox_count',
      type: Number
    },
    labels: null,
    labelsCount: {
      from: 'labels_count',
      type: Number
    },
    rulesCount: {
      from: 'rules_count',
      type: Number
    },
    trialEndDate: {
      from: 'trial_end_date',
      type: Date
    }
  }; }

  get users () {
    if (!this[USERS]) {
      this[USERS] = [];
      Object.defineProperty(this[USERS], 'promise', {
        value: new P((resolve, reject) => {
          this.Api.request('get', `/accounts/${this.id}/users`)
            .then(data => {
              for (let userData of data) {
                this[USERS].push(this.UserModelFactory.create(userData));
              }
              resolve(this[USERS]);
            })
            .catch(err => reject(err));
        }),
        enumerable: false
      });
    }
    return this[USERS];
  }

  get channels () {
    if (!this[CHANNELS]) {
      this.request('http://coincoin.sandbox.sleekapp.io/admin/accounts/1');
    }
  }
}

export default class AccountModelFactory extends ModelFactory {
  static inject() { return [Api, UserModelFactory]; }
  static Model () { return AccountModel; }
}
