import Api from './api';
import ModelFactory from './model';

class ChannelModel extends ModelFactory.Model() {
  static properties () { return {
    id: null,
    type: null,
    name: null,
    connected: {
      type: Boolean
    },
    icon: null,
    inboxCount: {
      from: 'inbox_count'
    },
    disabled: {
      type: Boolean
    }
  }; }
}

export default class ChannelModelFactory extends ModelFactory {
  //static inject() { return [Api, ChannelModelFactory]; }
  static Model () { return ChannelModel; }
}
