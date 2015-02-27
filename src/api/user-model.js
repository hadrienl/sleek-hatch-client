export default class UserModel {
  constructor (data = {}) {
    this.data = data;
  }

  get id () { return this.data.id; }
  set id (id) { this.data.id = id; }

  get name () { return this.data.name; }
  set name (id) { this.data.id = name; }
}
