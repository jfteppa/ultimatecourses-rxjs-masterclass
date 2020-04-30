import { Subject, interval } from 'rxjs';
import { tap, take } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const subject$ = new Subject();

const subscription = subject$.subscribe(observer);

// subject$.next('Hello');

const subscription2 = subject$.subscribe(observer);

// subject$.next('World');

const interval$ = interval(2000).pipe(
  tap((value) => console.log('new interval', value))
);

const subscibe1 = interval$.pipe(take(5)).subscribe(observer);
const subscibe2 = interval$.pipe(take(5)).subscribe(observer);

subscibe1.add(subscibe2);

setTimeout(() => {
  console.log(`unsubscribing all observer's subscriptions`);
  subscibe1.unsubscribe();
  // subscibe2.unsubscribe();
}, 5000);
/**
 * it logs
 * new interval 0
 * next 0
 * new interval 0
 * next 0
 *
 * new interval 1
 * next 1
 * new interval 1
 * next 1
 */

const subscibe3 = interval$.pipe(take(5)).subscribe(subject$);

setTimeout(() => {
  console.log(`unsubscribing all subject's subscriptions`);
  subscibe3.unsubscribe();
}, 5000);

/**
 * it logs:
 * new interval 0
 * next 0
 * next 0
 *
 * new interval 1
 * next 1
 * next 1
 */
