// import { Subject } from 'rxjs';
import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById('loading-overlay');

// loadingOverlay.classList.add('open');

/*
const loading$ = new Subject();

loading$.subscribe((isLoading) => {
  if (isLoading) {
    loadingOverlay.classList.add('open');
  } else {
    loadingOverlay.classList.remove('open');
  }
});

loading$.next(true);

setTimeout(() => {
  loading$.next(false);
}, 3000);
*/

loadingService.loadingStatus.subscribe((isLoading) => {
  if (isLoading) {
    loadingOverlay.classList.add('open');
  } else {
    loadingOverlay.classList.remove('open');
  }
});

loadingService.showLoading();

setTimeout(() => {
  loadingService.hideLoading();
}, 3000);
