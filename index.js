import { ReplaySubject } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

/**
 * ReplaySubject does not have an inital value
 */

/*
 * ReplaySubject's accept an optional argument, the number
 * of previously emitted values you wish to 'replay'
 * on subscription. These values will be emitted in sequence
 * beginning with the most recent, to any late subscribers.
 *
 * By default, if no arguments are supplied all values are replayed.
 */
const subject = new ReplaySubject();

subject.next('Hello');
subject.next('World');
subject.next('Goodbay');

subject.subscribe(observer); // Hello, World, Goodbay

const subject2 = new ReplaySubject(3);

subject2.next('1');
subject2.next('2');
subject2.next('3');
subject2.next('4');
subject2.next('5');

subject2.subscribe(observer); // 3, 4, 5, 6, 7

subject2.next('6');
subject2.next('7');
