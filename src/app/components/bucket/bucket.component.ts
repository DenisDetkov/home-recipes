import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {DishesStore} from "../dishes/dishes.store";
import {Dish} from "../../_models/dish";
import {take} from "rxjs";
import {DishService} from "../../_service/dish.service";
import {BucketService} from "../../_service/bucket.service";
import {modalAnimation} from "../../config/constants";

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  animations: [modalAnimation]
})
export class BucketComponent {
  @HostBinding('@modalAnimation') modalAnimation: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  dishesInBucket: Dish[] = [];

  constructor(readonly dishesStore: DishesStore,
              private dishService: DishService,
              private bucketService: BucketService) {
    this.dishesStore.bucket$.pipe(take(1)).subscribe(dishesIds => {
      if (dishesIds.length > 0) this.dishService.getDishesByIds(dishesIds).subscribe((dishes) => this.dishesInBucket = dishes);
    })
  }

  removeFromBucket(id: number) {
    this.dishesStore.removeFromBucket(id);
    this.dishesInBucket = this.dishesInBucket.filter((dish) => dish.id !== id);
  }

  submitBucket() {
    this.bucketService.applyBucket(this.dishesInBucket.map((dish: Dish) => dish.id)).subscribe(() => {
      this.dishesStore.clearBucket();
      this.close.emit();
    });
  }
}
