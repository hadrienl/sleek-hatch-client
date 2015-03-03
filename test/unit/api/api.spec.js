import Api from '../../../src/api/api';
import HttpStub from '../../mocks/http-mock';
//import 'petkaantonov/bluebird';

describe('Api', () => {
  var api,
    http = new HttpStub();
  beforeEach(() => api = new Api(http));

  it('should request data', (cb) => {
    var expected;
    api.request('get', '/foo')
      .then(data => {
        expect(data).toEqual('bar');
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      })
      .finally(() => cb());

    http.expect('get', '/foo').toRespond([200, 'bar']);
    http.flush();
  });
});
