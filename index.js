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

interval$.pipe(take(5)).subscribe(observer);
interval$.pipe(take(5)).subscribe(observer);

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

interval$.pipe(take(5)).subscribe(subject$);

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
