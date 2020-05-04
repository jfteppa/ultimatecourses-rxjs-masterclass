import { asyncScheduler, asapScheduler, of, range } from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

/*
 * The asapScheduler executes tasks asynchronously but
 * 'as quickly as possible', similar to microtasks.
 * For instance, even though our task scheduled with
 * the asapScheduler appears after the asyncScheduler
 * task, it will be executed before, but not before the
 * synchronous console.log. This is the same behavior
 * you would see with Promise.resolve or queueMicrotask.
 */

asyncScheduler.schedule(() => console.log('asyncScheduler'));

setTimeout(() => {
  console.log('setTimeout');
}, 0);

asyncScheduler.schedule(() => console.log('asyncScheduler 2'));

setTimeout(() => {
  console.log('setTimeout2');
}, 0);

/**
 * async will log in order but after the synchronous.
 */

Promise.resolve('from Promise').then(console.log);

queueMicrotask(() => console.log('from queueMicrotask'));

asapScheduler.schedule(() => console.log('from asapScheduler'));

/**
 * asyncScheduler, queueMicrotask and Promise they log in order,
 * if we change the order it will print them in the new order and
 * they will print after the synchronous but before the asyncScheduler
 */

console.log('synchronous');

/*
 * Like other schedulers it can be provided as an
 * argument to most static operators, or by using the observeOn
 * or subscribeOn operators.
 */
// as argument to static operator

range(1, 5).subscribe(console.log); // synchronous

range(1, 5, asapScheduler).subscribe(console.log); // asapScheduler

// of(1,2,3, asapScheduler).subscribe(observer);

// using observeOn
// of(1,2,3).pipe(
//   // logging values before scheduler
//   tap(observer),
//   observeOn(asapScheduler)
// ).subscribe(observer);

// using subscribeOn
// of(1,2,3).pipe(
//   tap(observer),
//   subscribeOn(asapScheduler)
// ).subscribe(observer);

/**
 * for long running operations it will block the ui until they complete
 * for this example we can see the browser pauses and then it
 * finally renders with the final value, this is because the browser is locked
 * waiting for the Microtask to finish before updating
 */

const counter = document.getElementById('counter');
const counter2 = document.getElementById('counter2');

range(1, 100000, asapScheduler).subscribe((val) => {
  counter.innerHTML = val;
});

// if we remove the asapScheduler we will have the same result

// if we switch to the asyncScheduler
// we will see the update of the numbers 1by 1

range(1, 1000, asyncScheduler).subscribe((val) => {
  counter2.innerHTML = val;
});
