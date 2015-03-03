import UsersService from '../../../src/api/users-service';
import HttpStub from '../../mocks/http-mock';

describe('UsersService', () => {
  var usersService,
    http = new HttpStub();

  beforeEach(() => usersService = new UsersService(http));

  it('should get all users', (cb) => {
    usersService
      .getAll()
      .then(users => {
        expect(users.length).toBe(2);
        expect(users[0].constructor.name).toBe('UserModel');
        expect(users[0].id).toBe(1);
        expect(users[0].name).toBe('Hadrien');
        expect(users[1].constructor.name).toBe('UserModel');
        expect(users[1].id).toBe(2);
        expect(users[1].name).toBe('Maurice');
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      })
      .finally(() => cb());

    http
      .expectGET('/mocks/users.json')
      .toRespond([200, [{
        id: 1,
        name: 'Hadrien'
      }, {
        id: 2,
        name: 'Maurice'
      }]]);
    http.flush();
  });
});
