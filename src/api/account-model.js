import Model from './model';

export default class AccountModel extends Model {
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
    taskCategoriesCount: {
      from: 'task_categories_count',
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
}
