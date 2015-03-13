import moment from 'moment/moment';

export class DateFormatValueConverter {
  toView (date, format) {
    if (!date instanceof Date) {
      date = new Date(date);
    }
    return moment(date).format(format);
  }
}
