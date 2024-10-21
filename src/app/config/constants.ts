import {animate, state, style, transition, trigger} from "@angular/animations";

export const modalAnimation = trigger('modalAnimation', [
  state('void', style({
    visibility: 'hidden',
    opacity: 0,
  })),
  state('*', style({
    visibility: 'visible',
    opacity: 1,
  })),
  transition('void <=> *', animate('0.3s ease-in-out')),
  transition('* => void', animate('0.3s ease-in-out'))
]);
