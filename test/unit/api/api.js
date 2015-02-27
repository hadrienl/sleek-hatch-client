import Api from '../../../src/api/api';
import HttpStub from '../../mocks/http';

describe('Api', () => {
  var api,
    http = new HttpStub();
  beforeEach(() => api = new Api(http));

  it('should request data', () => {
    var expected;
    api.request('get', '/foo')
      .then(data => {
        console.log('GRRARAR', data);
        expected = data;
      })
      .catch(err => console.error(err));

    http.expect('get', '/foo').toRespond('bar');
    http.flush();
console.log('ici');
    expect(expected).toEqual('bar');
  });
});
