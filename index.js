import { asyncScheduler, of, fromEvent } from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

/*
 * The asyncScheduler lets you schedule tasks asynchronously,
 * similar to a setTimeout. All schedulers have a signature
 * of work, delay, state, but providing a delay for any other
 * scheduler will simply default it to the asyncScheduler
 * behind the scenes.
 *
 * The schedule call returns a subscription, so if you need
 * to cancel work before it is performed you can simply
 * unsubscribe, similar to observables.
 */

// work, delay?, state?
// asyncScheduler.schedule(() => console.log('Hellow World'));
// asyncScheduler.schedule(() => console.log('Hellow World 2s'), 2000);
/* asyncScheduler.schedule(
  // work
  console.log,
  // delay
  3000,
  // state
  'Hello world 3s'
); */

setTimeout(() => {
  console.log('setTimeout');
}, 0);

console.log('sync');

const sub = asyncScheduler.schedule(console.log, 1000, 'Hello world 1s');

// it does log the HW 3s because we unsubscribe before the 1s delay
sub.unsubscribe();

/*
 * Most static creation operators accept a scheduler as
 * the last argument. For instance, if we want to emit
 * values from of asynchronously, we can supply the
 * asyncScheduler as the last argument.
 *
 * Output: 1,2,3,4,5,6,7,8,9
 */
of(1, 2, 3).subscribe(observer);
// of(7, 8, 9, asyncScheduler).subscribe(observer);
of(4, 5, 6).subscribe(observer);

/*
 * You can also introduce schedulers by using the
 * observeOn operator. This is equivalent to wrapping
 * next, error, and complete functions in appropriate
 * scheduler.
 *
 * this means everything outsite of the observer/function in the .subscribe()
 * will not be delayed, example the tap operator
 */
of(7, 8, 9)
  .pipe(
    // logging values before scheduler
    tap((value) => {
      console.log('observeOn tap: ', value);
    }),
    // delay can also be supplied as second argument
    observeOn(asyncScheduler, 3000)
    /**
     * instead of using the delay value,
     * we should use the delay operator,
     * because observeOn wraps all notifications in the provider scheduler
     * meaning error notifications will be delayed.
     *
     * delay operator will emit errors immediately
     */
  )
  .subscribe(observer);

/*
 * Lastly, you can use schedulers to determine when
 * subscriptions occur by using the subscribeOn
 * operator. This is equivalent to wrapping your entire
 * subscription in a scheduler.
 *
 * it means everything inside of the pipe (this case the tap)
 * and subscribe
 */
of(7, 8, 9)
  .pipe(
    tap((value) => {
      console.log('subscribeOn tap: ', value);
    }),
    subscribeOn(asyncScheduler, 6000)
  )
  .subscribe(observer);
