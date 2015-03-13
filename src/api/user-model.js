import Model from './model';

export default class UserModel extends Model {
  static properties () { return {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    createdAt: {
      from: 'created_at',
      type: Date
    },
    updatedAt: {
      from: 'updated_at',
      type: Date
    },
    job: null,
    language: null,
    timezone: null,
    tourStep: {
      from: 'tour_step'
    },
    showTour: {
      from: 'show_tour',
      type: Boolean
    }
  }; }
}
