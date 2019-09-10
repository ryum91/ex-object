import ExLocale from './ex.Locale';

const ONE_DAY = (1000 * 60 * 60 * 24);

/**
 * Date 객체를 확장한 Class
 */
class ExDate extends Date {

  constructor(param) {
    if( param ) {
      super(param);
    } else {
      super();
    }
  }

  static parse(val) {
    const result = new ExDate();
    result.setTime(Date.parse(val));
    return result;
  }

  static now() {
    return new ExDate();
  }

  format(formatStr) {
    let h = this.getHours();
    return formatStr.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, ($1) => {
      switch ($1) {
      case 'yyyy': return this.getFullYear();
      case 'yy': return (this.getFullYear() % 1000).toString().padStart(2, 0);
      case 'MM': return (this.getMonth() + 1).toString().padStart(2, 0);
      case 'dd': return this.getDate().toString().padStart(2, 0);
      case 'E': return Object.values(ExLocale.ExDate.week)[this.getDay()];
      case 'HH': return this.getHours().toString().padStart(2, 0);
      case 'hh': return (h % 12 ? h : 12).toString().padStart(2, 0);
      case 'mm': return this.getMinutes().toString().padStart(2, 0);
      case 'ss': return this.getSeconds().toString().padStart(2, 0);
      case 'a/p': return this.getHours() < 12 ? ExLocale.ExDate.time.am : ExLocale.ExDate.time.pm;
      default: return $1;
      }
    });
  }

  getFullDate(separator = '-') {
    return this.format(`yyyy${separator}MM${separator}dd`);
  }

  getFullTime(separator = ':') {
    return this.format(`HH${separator}mm${separator}ss`);
  }

  addDate(val) {
    if( !val ) {
      return this;
    }
    super.setTime(this.time + (ONE_DAY * val));
    return this;
  }

  toString() {
    return this.format('yyyy-MM-dd HH:mm:ss');
  }

  clone() {
    return new ExDate(this.time);
  }

  get year() {
    return super.getFullYear();
  }

  set year(val) {
    if( val ) {
      super.setYear(val);
    }
  }

  get month() {
    return super.getMonth() + 1;
  }

  set month(val) {
    if( val ) {
      super.setMonth(val - 1);
    }
  }

  get date() {
    return super.getDate();
  }

  set date(val) {
    if( val ) {
      super.setDate(val);
    }
  }

  get day() {
    return super.getDay();
  }

  get hours() {
    return super.getHours();
  }

  set hours(val) {
    super.setHours(val);
  }

  get minutes() {
    return super.getMinutes();
  }

  set minutes(val) {
    super.setMinutes(val);
  }

  get seconds() {
    return super.getSeconds();
  }

  set seconds(val) {
    super.setSeconds(val);
  }

  get milliseconds() {
    return super.getMilliseconds();
  }

  set milliseconds(val) {
    super.setMilliseconds(val);
  }

  get time() {
    return super.getTime();
  }

  set time(val) {
    super.setTime(val);
  }
}

export default ExDate;