import { BehaviorSubject, interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const subject = new Subject();

const subscription = subject.subscribe(observer);

subject.next('Hello');
// subscription gets 'Hello'

const subscription2 = subject.subscribe(observer);
/**
 * subscription2 gets nothing
 */

subject.next('World');
/**
 * subscription and subscription2 gets 'World'
 */

/*
 * BehaviorSubject's accept an argument, the initial seed value.
 * This value will be emitted to subscribers until .next is called
 * again. New subscribers to BehaviorSubject's always receieve the
 * last emitted value on subscription.
 */

const subject2 = new BehaviorSubject('Hello 2');

/*
 * Subscribers to the BehaviorSubject will receieve the seed value,
 * or last emitted value. In this case no other value has been
 * emitted so the subscriber will initially receive 'Hello'
 */

/**
 * they both get the initial value because no other value was emitted yet.
 */
const subscription3 = subject2.subscribe(observer);
const subscription4 = subject2.subscribe(observer);

subject2.next('World 2');

setTimeout(() => {
  /**
   * after 3 seconds we subscribe and it gets the latest value
   * instead of nothing
   */
  subject2.subscribe(observer);

  /**
   * if we want to get the latest value
   * without subscribing
   */
  console.log('last value without subscribing', subject2.getValue());
}, 3000);
