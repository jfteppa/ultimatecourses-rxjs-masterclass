// begin lesson code
import { fromEvent, throwError, timer, range, of, Observable } from 'rxjs';
import {
  takeUntil,
  finalize,
  zip,
  mergeMap,
  retryWhen,
  mergeMapTo,
  catchError,
} from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click');

const { aaa, bbb = 2, ccc = 5 } = { aaa: 1, bbb: 3 };
console.log(aaa, bbb, ccc);

/*
 * Remember, functions that appears in the pipe method will be passed
 * an observable source and must return a new observable which will be used
 * as an source observable for the next operator.
 */
export function customRetry({
  excludedStatusCodes = [],
  retryAttemps = 3,
  scalingDuration = 1000,
} = {}) {
  /*
   * rather than having our custom function accept a source observable,
   * let's have it accept an option object instead.
   * We can then return a function that accepts a source observale
   */
  return function (source) {
    // returning new observable.
    return source.pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (
              attemptNumber > retryAttemps ||
              excludedStatusCodes.find((e) => e === error.status)
            ) {
              console.log('Giving up!');
              return throwError(error);
            }
            console.log(`Attempt ${attemptNumber}: retrying in ${attemptNumber * 1000}ms`);
            return timer(attemptNumber * scalingDuration);
          })
        );
      })
    );
  };
}

click$
  .pipe(
    mergeMapTo(
      throwError({
        status: 400,
        message: 'Server error',
      }).pipe(
        /* retryWhen((attempts) => {
          return attempts.pipe(
            mergeMap((error, i) => {
              const attemptNumber = i + 1;
              if (attemptNumber > 3 || [404, 500].find((e) => e === error.status)) {
                console.log('Giving up!');
                return throwError(error);
              }
              console.log(`Attempt ${attemptNumber}: retrying in ${attemptNumber * 1000}ms`);
              return timer(attemptNumber * 1000);
            })
          );
        }), */
        customRetry({ retryAttemps: 4 }),
        catchError((err) => of(err.message))
      )
    )
  )
  .subscribe(console.log);
