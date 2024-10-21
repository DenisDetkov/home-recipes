import {Component, EventEmitter, Output} from '@angular/core';
import {DishesStore} from "../dishes/dishes.store";

@Component({
  selector: 'app-bucket-float',
  templateUrl: './bucket-float.component.html',
  styleUrls: ['./bucket-float.component.scss']
})
export class BucketFloatComponent {
  @Output() bucketOpened = new EventEmitter();

  constructor(readonly dishesStore: DishesStore) {
  }
}
