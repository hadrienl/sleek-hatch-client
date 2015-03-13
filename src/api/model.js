export default class Model {
  static properties () { return {}; }

  constructor (data = {}) {
    this.data = data;

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
