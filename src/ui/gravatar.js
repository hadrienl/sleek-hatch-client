import {Behavior} from 'aurelia-templating';
import md5 from 'js-md5';

const DEFAULT_WIDTH = 64;

export class GravatarCustomElement {
  static metadata(){
    return Behavior
      .withProperty('email').and(x => x.bindingIsOneWay())
      .withProperty('size')
      .useShadowDOM();
  }

  constructor () {
    this.width = DEFAULT_WIDTH;
  }

  sizeChanged (size) {
    if (+size > 0) {
      this.width = +size;
    } else {
      switch (size) {
        case 'lg':
          this.width = 100;
          break;
        case 'sm':
          this.width = 32;
          break;
        case 'xs':
          this.width = 16;
          break;
        default:
        case 'md':
          this.width = 64;
          break;
      }
    }
  }
  emailChanged (email) {
    let hash = md5(email),
      width = this.width;
    this.src = `//secure.gravatar.com/avatar/${hash}?s=${width}&d=blank`;
  }
}
