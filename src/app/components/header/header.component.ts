import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() openNewDishForm: EventEmitter<any> = new EventEmitter();
  @Output() openBucket: EventEmitter<any> = new EventEmitter();
}
