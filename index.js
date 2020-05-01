import { AsyncSubject } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

/*
 * AsyncSubject's only emit the final value on completion.
 */
const subject = new AsyncSubject();

/*
 * For instance, let's create a few subscribers here...
 */
const subscription = subject.subscribe(observer);
const secondSubscription = subject.subscribe(observer);

/*
 * next 4 values to AsyncSubject, nothing is emitted to observers.
 */
subject.next('Hello');
subject.next('World');
subject.next('Goodbye!');
subject.next('World!');

/*
 * Once the subject completes, the last value, in this case
 * 'World!' is emitted.
 */
subject.complete();
