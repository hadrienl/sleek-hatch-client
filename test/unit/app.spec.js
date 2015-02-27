import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  beforeEach(() => { sut = new App(new RouterStub()); });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined(); 
  });
  
  it('configures the router title', () => {
    expect(sut.router.title).toEqual('The Hatch');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['','welcome'],  moduleId: 'welcome/welcome' });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContain({
      route: 'users',
      moduleId: 'users/users',
      nav: true,
      title: 'Users'
    });
  });

  it('should have a accounts route', () => {
    expect(sut.router.routes).toContain({
      route: 'accounts',
      moduleId: 'accounts/accounts',
      nav: true,
      title: 'Accounts'
    });
  });

  it('should have a channels route', () => {
    expect(sut.router.routes).toContain({
      route: 'channels',
      moduleId: 'channels/channels',
      nav: true,
      title: 'Channels'
    });
  });
});
