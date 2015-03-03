export default class HttpStub {
  constructor () {
    this.expected = {};
    this.queue = [];
  }

  getId (method, path) {
    return `${method.toLowerCase()}-${path}`;
  }

  createResponse (data) {
    var response = {
      response: '',
      responseType: 'json',
      content: '',
      headers: '',
      statusCode: '',
      statusText: '',
      isSuccess: '',
      reviver: () => {},
      requestMessage: ''
    };

    if (Array.isArray(data)) {
      response.statusCode = data[0];
      data = data[1];
    } else {
      response.statusCode = 200;
    }

    if (typeof data === 'object') {
      response.response = JSON.stringify(data);
      response.responseType = 'json';
      response.content = data;
    }

    if (typeof data === 'string') {
      response.response = data;
      response.responseType = 'text';
      response.content = data;
    }

    return response;
  }

  expect (method, path, params) {
    var expected = {
        method: method,
        path: path,
        params: params,
        response: this.createResponse([200, ''])
      };

    this.expected[this.getId(method, path)] = expected;

    return {
      toRespond: (data) => {
        expected.response = this.createResponse(data);
      }
    };
  }
  expectGET (path) {
    return this.expect('get', path);
  }
  expectPOST (path, params) {
    return this.expect('post', path, params);
  }
  expectPATCH (path, params) {
    return this.expect('patch', path, params);
  }
  expectDELETE (path) {
    return this.expect('delete', path);
  }

  request (method, path, params) {
    var deferred = {},
      promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
      });

    deferred.promise = promise;

    this.queue.push({
      method: method,
      path: path,
      params: params,
      deferred: deferred
    });

    return promise;
  }

  get (path) {
    return this.request('get', path);
  }
  post (path, params) {
    return this.request('post', path, params);
  }
  patch (path, params) {
    return this.request('patch', path, params);
  }
  delete (path) {
    return this.request('delete', path);
  }

  flush () {
    this.queue.forEach(request => {
      var expected = this.expected[this.getId(request.method, request.path)];

      if (expected) {
        request.deferred.resolve(expected.response);
      } else {
        request.deferred.reject(`No response for [${request.method}]${request.path}`);
      }
    });

    this.queue.splice(0, this.queue.length);
  }
}
