import UserModel from '../../../src/api/user-model';

describe('UserModel', () => {
  it('should create a new UserModel', () => {
    var user = new UserModel({ id: 1, name: 'Maurice' });
    expect(user.id).toBe(1);
    expect(user.name).toBe('Maurice');
  });
});
