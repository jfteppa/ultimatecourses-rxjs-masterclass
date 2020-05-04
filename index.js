import { animationFrameScheduler, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const ball = document.getElementById('ball');
/*
 * The animationFrameScheduler let's you schedule
 * tasks before browser repaint
 * to help create smooth animations
 */

// animationFrameScheduler.schedule(function(position){
//   ball.style.transform = `translate3d(0, ${position}px, 0`;
//   if(position <= 300) {

//     /**
//      * because we are using a function keyword and not a arrow function
//      * the context of the this keyword will be the currently executing action itselt
//      */
//     this.schedule(position + 1)
//   }
// },
// /**
//  * 0 for the delay, if we pass any other value this will simple default
//  * to the asyncScheduler
//  */
// 0,
// /**
//  * for the state property we are passing 0 as this is the starting position
//  * for the element on the page
//  */
// 0);

interval(0, animationFrameScheduler)
  .pipe(takeWhile((val) => val <= 300))
  .subscribe((val) => {
    ball.style.transform = `translate3d(0, ${val}px, 0`;
  });
