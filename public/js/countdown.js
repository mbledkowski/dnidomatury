/**
 * @license countdown.js v2.6.0 http://countdownjs.org
 * Copyright (c)2006-2014 Stephen M. McKamey.
 * Licensed under The MIT License.
 */
var module;
var countdown = (
  function (module) {
    'use strict';
    var MILLISECONDS = 0x001;
    var SECONDS = 0x002;
    var MINUTES = 0x004;
    var HOURS = 0x008;
    var DAYS = 0x010;
    var WEEKS = 0x020;
    var MONTHS = 0x040;
    var YEARS = 0x080;
    var DEFAULTS = MONTHS | DAYS | HOURS | MINUTES | SECONDS;
    var MILLISECONDS_PER_SECOND = 1000;
    var SECONDS_PER_MINUTE = 60;
    var MINUTES_PER_HOUR = 60;
    var HOURS_PER_DAY = 24;
    var MILLISECONDS_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
    var DAYS_PER_WEEK = 7;
    var MONTHS_PER_YEAR = 12;
    var ceil = Math.ceil;
    var floor = Math.floor;
    function borrowMonths(ref, shift) {
      var prevTime = ref.getTime();
      ref.setMonth(ref.getMonth() + shift);
      return Math.round((ref.getTime() - prevTime) / MILLISECONDS_PER_DAY);
    }
    var LABEL_MILLISECONDS = 0;
    var LABEL_SECONDS = 1;
    var LABEL_MINUTES = 2;
    var LABEL_HOURS = 3;
    var LABEL_DAYS = 4;
    var LABEL_WEEKS = 5;
    var LABEL_MONTHS = 6;
    var LABEL_YEARS = 7;
    var LABELS_SINGLUAR;
    var LABELS_PLURAL;
    var LABEL_LAST;
    var LABEL_DELIM;
    var LABEL_NOW;
    var formatter;
    var formatNumber; var formatList;
    function Timespan() { } function rippleRounded(ts, toUnit) {
      switch (toUnit) {
        case 'seconds':
          if (ts.seconds !== SECONDS_PER_MINUTE || isNaN(ts.minutes)) {
            return;
          } ts.minutes++;
          ts.seconds = 0;        /* falls through */
        case 'minutes':
          if (ts.minutes !== MINUTES_PER_HOUR || isNaN(ts.hours)) {
            return;
          } ts.hours++;
          ts.minutes = 0;        /* falls through */
        case 'hours':
          if (ts.hours !== HOURS_PER_DAY || isNaN(ts.days)) {
            return;
          } ts.days++;
          ts.hours = 0;        /* falls through */
        case 'days':
          if (ts.days !== DAYS_PER_WEEK || isNaN(ts.weeks)) {
            return;
          } ts.weeks++;
          ts.days = 0;        /* falls through */
        case 'weeks':
          if (ts.weeks !== daysPerMonth(ts.refMonth) / DAYS_PER_WEEK || isNaN(ts.months)) {
            return;
          } ts.months++;
          ts.weeks = 0;        /* falls through */
        case 'months':
          if (ts.months !== MONTHS_PER_YEAR || isNaN(ts.years)) {
            return;
          } ts.years++;
          ts.months = 0;        /* falls through */
      }
    }
    function fraction(ts, frac, fromUnit, toUnit, conversion, digits) {
      if (ts[fromUnit] >= 0) {
        frac += ts[fromUnit];
        delete ts[fromUnit];
      } frac /= conversion;
      if (frac + 1 <= 1) {
        return 0;
      } if (ts[toUnit] >= 0) {
        ts[toUnit] = +(ts[toUnit] + frac).toFixed(digits);
        rippleRounded(ts, toUnit);
        return 0;
      } return frac;
    }
    function fractional(ts, digits) {
      var frac = fraction(ts, 0, 'milliseconds', 'seconds', MILLISECONDS_PER_SECOND, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'seconds', 'minutes', SECONDS_PER_MINUTE, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'minutes', 'hours', MINUTES_PER_HOUR, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'hours', 'days', HOURS_PER_DAY, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'days', 'weeks', DAYS_PER_WEEK, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'weeks', 'months', daysPerMonth(ts.refMonth) / DAYS_PER_WEEK, digits);
      if (!frac) { return; } frac = fraction(ts, frac, 'months', 'years', daysPerYear(ts.refMonth) / daysPerMonth(ts.refMonth), digits);
      if (frac) { throw new Error('Fractional unit overflow'); }
    }
    function ripple(ts) {
      var x; if (ts.milliseconds < 0) {
        x = ceil(-ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.seconds -= x;
        ts.milliseconds += x * MILLISECONDS_PER_SECOND;
      } else if (ts.milliseconds >= MILLISECONDS_PER_SECOND) {
        ts.seconds += floor(ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.milliseconds %= MILLISECONDS_PER_SECOND;
      } if (ts.seconds < 0) {
        x = ceil(-ts.seconds / SECONDS_PER_MINUTE);
        ts.minutes -= x;
        ts.seconds += x * SECONDS_PER_MINUTE;
      } else if (ts.seconds >= SECONDS_PER_MINUTE) {
        ts.minutes += floor(ts.seconds / SECONDS_PER_MINUTE);
        ts.seconds %= SECONDS_PER_MINUTE;
      } if (ts.minutes < 0) {
        x = ceil(-ts.minutes / MINUTES_PER_HOUR);
        ts.hours -= x;
        ts.minutes += x * MINUTES_PER_HOUR;
      } else if (ts.minutes >= MINUTES_PER_HOUR) {
        ts.hours += floor(ts.minutes / MINUTES_PER_HOUR);
        ts.minutes %= MINUTES_PER_HOUR;
      } if (ts.hours < 0) {
        x = ceil(-ts.hours / HOURS_PER_DAY);
        ts.days -= x;
        ts.hours += x * HOURS_PER_DAY;
      } else if (ts.hours >= HOURS_PER_DAY) {
        ts.days += floor(ts.hours / HOURS_PER_DAY);
        ts.hours %= HOURS_PER_DAY;
      } while (ts.days < 0) {
        ts.months--;
        ts.days += borrowMonths(ts.refMonth, 1);
      } if (ts.days >= DAYS_PER_WEEK) {
        ts.weeks += floor(ts.days / DAYS_PER_WEEK);
        ts.days %= DAYS_PER_WEEK;
      } if (ts.months < 0) {
        x = ceil(-ts.months / MONTHS_PER_YEAR);
        ts.years -= x;
        ts.months += x * MONTHS_PER_YEAR;
      } else if (ts.months >= MONTHS_PER_YEAR) {
        ts.years += floor(ts.months / MONTHS_PER_YEAR);
        ts.months %= MONTHS_PER_YEAR;
      }
    }
    function pruneUnits(ts, units, max, digits) {
      var count = 0;
      if (!(units & YEARS) || (count >= max)) {
        ts.months += ts.years * MONTHS_PER_YEAR;
        delete ts.years;
      } else if (ts.years) {
        count++;
      } if (!(units & MONTHS) || (count >= max)) {
        if (ts.months) {
          ts.days += borrowMonths(ts.refMonth, ts.months);
        }
        delete ts.months; if (ts.days >= DAYS_PER_WEEK) {
          ts.weeks += floor(ts.days / DAYS_PER_WEEK);
          ts.days %= DAYS_PER_WEEK;
        }
      } else if (ts.months) {
        count++;
      } if (!(units & WEEKS) || (count >= max)) {
        ts.days += ts.weeks * DAYS_PER_WEEK;
        delete ts.weeks;
      } else if (ts.weeks) {
        count++;
      } if (!(units & DAYS) || (count >= max)) {
        ts.hours += ts.days * HOURS_PER_DAY;
        delete ts.days;
      } else if (ts.days) {
        count++;
      } if (!(units & HOURS) || (count >= max)) {
        ts.minutes += ts.hours * MINUTES_PER_HOUR;
        delete ts.hours;
      } else if (ts.hours) {
        count++;
      } if (!(units & MINUTES) || (count >= max)) {
        ts.seconds += ts.minutes * SECONDS_PER_MINUTE;
        delete ts.minutes;
      } else if (ts.minutes) {
        count++;
      } if (!(units & SECONDS) || (count >= max)) {
        ts.milliseconds += ts.seconds * MILLISECONDS_PER_SECOND;
        delete ts.seconds;
      } else if (ts.seconds) {
        count++;
      } if (!(units & MILLISECONDS) || (count >= max)) {
        fractional(ts, digits);
      }
    }
    function populate(ts, start, end, units, max, digits) {
      var now = new Date(); ts.start = start = start || now;
      ts.end = end = end || now;
      ts.units = units; ts.value = end.getTime() - start.getTime();
      if (ts.value < 0) {
        var tmp = end;
        end = start;
        start = tmp;
      }
      ts.refMonth = new Date(start.getFullYear(), start.getMonth(), 15, 12, 0, 0);
      try {
        ts.years = end.getFullYear() - start.getFullYear();
        ts.months = end.getMonth() - start.getMonth();
        ts.weeks = 0;
        ts.days = end.getDate() - start.getDate();
        ts.hours = end.getHours() - start.getHours();
        ts.minutes = end.getMinutes() - start.getMinutes();
        ts.seconds = end.getSeconds() - start.getSeconds();
        ts.milliseconds = end.getMilliseconds() - start.getMilliseconds(); ripple(ts);
        pruneUnits(ts, units, max, digits);
      } finally {
        delete ts.refMonth;
      } return ts;
    } function countdown(start, end, units, max, digits) {
      var callback;
      units = +units || DEFAULTS; max = (max > 0) ? max : NaN; digits = (digits > 0) ? (digits < 20) ? Math.round(digits) : 20 : 0;
      var startTS = null;
      if ('function' === typeof start) {
        callback = start;
        start = null;
      } else if (!(start instanceof Date)) {
        if ((start !== null) && isFinite(start)) {
          start = new Date(+start);
        } else {
          if ('object' === typeof startTS) {
            startTS = (start);
          }
          start = null;
        }
      }
      var endTS = null;
      if ('function' === typeof end) {
        callback = end;
        end = null;
      } else if (!(end instanceof Date)) {
        if ((end !== null) && isFinite(end)) {
          end = new Date(+end);
        } else {
          if ('object' === typeof end) {
            endTS = (end);
          }
          end = null;
        }
      }
      if (startTS) {
        start = addToDate(startTS, end);
      }
      if (endTS) {
        end = addToDate(endTS, start);
      } if (!start && !end) {
        return new Timespan();
      } if (!callback) {
        return populate(new Timespan(), (start), (end), (units), (max), (digits));
      } fn();
      return (timerId = setInterval(fn, delay));
    }
    countdown.MILLISECONDS = MILLISECONDS;
    countdown.SECONDS = SECONDS;
    countdown.MINUTES = MINUTES;
    countdown.HOURS = HOURS;
    countdown.DAYS = DAYS;
    countdown.WEEKS = WEEKS;
    countdown.MONTHS = MONTHS;
    countdown.YEARS = YEARS;
    countdown.DEFAULTS = DEFAULTS;
    countdown.ALL = MONTHS | WEEKS | DAYS | HOURS | MINUTES | SECONDS;
    var resetFormat = countdown.resetFormat = function () {
      LABELS_SINGLUAR = ' millisecond| second| minute| hour| day| week| month| year'.split('|');
      LABELS_PLURAL = ' milliseconds| seconds| minutes| hours| days| weeks| months| years'.split('|');
      LABEL_LAST = ' and ';
      LABEL_DELIM = ', ';
      LABEL_NOW = '';
    }; countdown.resetLabels = resetFormat; resetFormat();
    return countdown;
  })(module);
export default countdown
