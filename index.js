// begin lesson code
import { interval, fromEvent, throwError } from 'rxjs';
import { take, takeUntil, finalize } from 'rxjs/operators';

// elems
const counter = document.getElementById('counter');

// streams
const click$ = fromEvent(document, 'click');

// it completes
/* const sub = interval(1000)
  .pipe(take(3))
  .subscribe({
    next: (val) => {
      counter.innerHTML = val;
    },
    complete: () => {
      counter.innerHTML = 'Stopped!';
    },
  }); */

// it stops at #2 but it does not complete.
/* const sub = interval(1000).subscribe({
  next: (val) => {
    counter.innerHTML = val;
  },
  complete: () => {
    counter.innerHTML = 'Stopped!';
  },
}); */

// calling unsubscribe will not trigger complete callbacks
/* setTimeout(() => {
  sub.unsubscribe();
}, 3000); */

// it will call finalize when unsubscribe.
// it will also work with take, takeUntil, etc.
/* const sub = interval(1000)
  .pipe(
    finalize(() => {
      counter.innerHTML = 'Stopped!';
    })
  )
  .subscribe((val) => {
    counter.innerHTML = val;
  });

setTimeout(() => {
  sub.unsubscribe();
}, 3000); */

/* const sub = interval(1000)
  .pipe(
    take(3),
    finalize(() => {
      console.log('stopped');
    })
  )
  .subscribe({
    next: (val) => {
      counter.innerHTML = val;
    },
    complete: () => {
      console.log('stopped 2');
    },
  }); */

const sub = throwError('Error xx')
  .pipe(
    take(3),
    finalize(() => {
      console.log('stopped');
    })
  )
  .subscribe({
    next: (val) => {
      counter.innerHTML = val;
    },
    complete: () => {
      console.log('stopped 2');
    },
    error: (error) => {
      console.log(error);
    },
  });
