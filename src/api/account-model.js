export default class AccountModel {
  static properties () { return {
    id: null,
    name: null,
    subdomain: null,
    createdAt: {
      from: 'create_at',
      type: Date
    },
    usersCount: {
      from: 'users_count'
    },
    channelsCount: {
      from: 'channels_count'
    }
  }; }

  constructor (data = {}) {
    this.data = data;

    var properties = AccountModel.properties();
    for (var property in properties) {
      this.setProperty(property);
    }
  }

  setProperty (property) {
    var properties = AccountModel.properties(),
      definition = properties[property] || {},
      propertyName = definition.from || property;

    Object.defineProperty(this, property, {
      get: () => this.data[propertyName],
      set: (v) => this.data[propertyName] = v
    });
  }
}
