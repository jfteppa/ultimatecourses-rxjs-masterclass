import { BehaviorSubject, Subject } from 'rxjs';
import { scan, pluck, distinctUntilKeyChanged } from 'rxjs/operators';

export class ObservableStore {
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);

    this._stateUpdate = new Subject();

    this._stateUpdate
      .pipe(
        /*
         * Accumulate state over time using scan.
         * For this example we will just merge our current state
         * with updated state and emit the result, however
         * this could be any reducer / pattern you wish to follow.
         */
        scan((acc, curr) => {
          return { ...acc, ...curr };
        }, initialState)
      )
      .subscribe(this._store);
  }

  /*
   * Update state with new object to merge.
   */
  updateState(stateUpdate) {
    this._stateUpdate.next(stateUpdate);
  }

  /*
   * Select a slice of state based on key.
   */
  stateKeyChanges(statekey) {
    return this._store.pipe(distinctUntilKeyChanged(statekey), pluck(statekey));
  }

  /*
   * Subscribe to any store state changes.
   */
  stateChanges() {
    return this._store.asObservable();
  }
}
