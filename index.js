import { Subject, interval } from 'rxjs';
import { tap, multicast, refCount, share, take } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const subject = new Subject();
const interval$ = interval(2000).pipe(
  tap((i) => console.log('new interval', i))
);

// interval$.subscribe(subject);

const subscribe1 = subject.subscribe(observer);
const subscribe2 = subject.subscribe(observer);

const multicastedInterval$ = interval$.pipe(
  // multicast(() => new Subject()),
  // handles the auto connect
  // refCount()

  /*
   * We can actually optimize this example even further. Because multicasting
   * with a refCount is so common, RxJS offers an operator that
   * does both of these things for us, the share operator. This let's us replace
   * multicast and refCount with share for the same behavior.
   */

  // multicast + refCount
  share()
);

/*
 * Instead of explicitly calling connect(), you can instead use the
 * refCount operator. refCount will automatically connect the Subject
 * to the source for you when the first subscriber arrives, and disconnect
 * when the subscriber count hits zero.
 */

// we can remove this line after we add the refCount
// const connectedSub = multicastedInterval$.connect();

const subscribe3 = multicastedInterval$.subscribe(observer);
const subscribe4 = multicastedInterval$.subscribe(observer);

setTimeout(() => {
  // the observer stops but the interval continues
  // subscribe3.unsubscribe();
  // subscribe4.unsubscribe();

  // we can remove this line after we add the refCount
  // connectedSub.unsubscribe(); // the interval stops

  // after adding the refCount
  subscribe3.unsubscribe();
  subscribe4.unsubscribe();
}, 3000);

/**
 * to be able to see the steps
 */

/**
 * with this approach we can see how the observers stops
 * but the interval keeps running
 *
 */
/* const subject = new Subject();

interval(2000)
  .pipe(
    tap((i) => console.log('new interval', i)),
    take(10)
  )
  .subscribe(subject);

const subscribe1 = subject.subscribe(observer);
const subscribe2 = subject.subscribe(observer); */

// ======================================================

/**
 * with this approach we can see how the observers and the interval stops
 */
/* const interval$ = interval(2000).pipe(
  tap((i) => console.log('new interval', i)),
  take(10),
  share()
);
const subscribe1 = interval$.subscribe(observer);
const subscribe2 = interval$.subscribe(observer); */

/* setTimeout(() => {
  subscribe1.unsubscribe();
  subscribe2.unsubscribe();
}, 3000); */
