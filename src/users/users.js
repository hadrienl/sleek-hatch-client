import UsersService from '../api/users-service';

export class Users {
  static inject() { return [UsersService]; }
  constructor (UsersService) {
    this.UsersService = UsersService;
  }
  activate () {
    return this.UsersService
      .getAll()
      .then(users => {
        this.users = users;
      });
  }
}
