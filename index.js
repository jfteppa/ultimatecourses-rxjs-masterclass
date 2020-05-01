import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { shareReplay, mergeMapTo, share, take, tap } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const ajax$ = ajax('https://api.github.com/users/octocat');

const click$ = fromEvent(document, 'click');

/*
 * shareReplay turns a unicast observable into multicasted
 * observable, utilizing a ReplaySubject behind the scenes.
 *
 * In this example, we are mapping any clicks to an ajax
 * request, sharing the response.
 */

const sharedClick$ = click$.pipe(
  mergeMapTo(interval(1000).pipe(take(5))),
  // mergeMapTo(ajax$),
  /*
   * By default shareReplay shares all old values, like
   * a standard ReplaySubject. In this case, we only want
   * to share the most recent response.
   */

  /**
   * this makes new subscriber not to trigger the ajax
   * more than 1 time, comment out to see the network after 1 click
   */
  // shareReplay()

  // only the n last values
  // shareReplay(2)

  /**
   * the 2nd argument sets how long are all values available
   */
  shareReplay(2, 2000)
);

sharedClick$.subscribe(observer);

// it does not trigger the ajax after adding shareReplay()
sharedClick$.subscribe(observer);

/*
 * Late subscribers will be replayed old value(s).
 */
setTimeout(() => {
  console.log('subscribing');

  /**
   * it does not trigger the ajax request
   *
   * but if we click more than 1 time
   * it will get all the data
   */
  sharedClick$.subscribe(observer);
}, 5000);
