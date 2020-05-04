import { asyncScheduler, asapScheduler, queueScheduler, of } from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

/*
 * The queueScheduler executes tasks synchronously by default,
 * allowing you to queue tasks inside other tasks.
 */

console.log('synchronous');
queueScheduler.schedule(() => console.log('queueScheduler'));
console.log('synchronous 2');

asyncScheduler.schedule(() => console.log('asyncScheduler'));
asapScheduler.schedule(() => console.log('asapScheduler'));
queueScheduler.schedule(() => console.log('queueScheduler'));
console.log('synchronous 3');

/*
 * Scheduling tasks with queue scheduler inside another
 * queue will always execute the outer tasks first.
 */
queueScheduler.schedule(() => {
  //
  queueScheduler.schedule(() => {
    console.log('inside second queue'); // logged 2nd

    //
    queueScheduler.schedule(() => {
      console.log('inside third queue'); // logged 3rd
    });
  });
  //
  console.log('inside first queue'); // logged 1st
});
