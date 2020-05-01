import { ObservableStore } from './store';

const strore = new ObservableStore({
  user: 'teppa',
  isAuthenticated: false,
});

strore.stateChanges().subscribe((state) => {
  console.log('state changed', state);
});

strore.stateKeyChanges('user').subscribe((state) => {
  console.log('state Key user changed', state);
});

setTimeout(() => {
  strore.updateState({
    user: 'joe',
  });
}, 2000);

setTimeout(() => {
  strore.updateState({
    isAuthenticated: true,
  });
}, 4000);
