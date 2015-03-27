const SERVICES = Symbol();

class Model {
  static properties () { return {}; }

  constructor (data, ...services) {
    this.data = data || {};

    for (let service of services) {
      this[service.constructor.name] = service;
    }

    var properties = this.constructor.properties();
    for (var property in properties) {
      this.setProperty(property);
    }
  }

  setProperty (property) {
    var properties = this.constructor.properties(),
      definition = properties[property] || {},
      propertyName = definition.from || property;

    Object.defineProperty(this, property, {
      get: () => {
        switch (definition.type) {
          case Date:
            return new Date(this.data[propertyName]);
          case Number:
            return +this.data[propertyName];
          case Boolean:
            return Boolean(this.data[propertyName]);
          case String:
            return `${this.data[propertyName]}`;
          default:
            return this.data[propertyName];
        }
      },
      set: (v) => this.data[propertyName] = v
    });
  }
}

export default class ModelFactory {
  static Model () { return Model; }
  constructor (...services) {
    this[SERVICES] = services;
  }

  create (data) {
    let Model = this.constructor.Model();
    return new Model(data, ...this[SERVICES]);
  }
}
