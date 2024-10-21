import {Component, EventEmitter, Output} from '@angular/core';
import {SwiperOptions} from "swiper";
import {DishesStore} from "./dishes.store";
import {Dish} from "../../_models/dish";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent {
  @Output() editDish: EventEmitter<Dish> = new EventEmitter();

  config: SwiperOptions = {
    freeMode: true,
    spaceBetween: 24,
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        direction: 'vertical',
        enabled: false
      },
      1440: {
        direction: 'horizontal',
        enabled: true
      }
    }
  };

  activeTab: 'MAIN' | 'BREAKFAST' | 'DESERT' = 'MAIN'

  dishes = this.dishesStore.dishes$;

  changeTab(newTab: 'MAIN' | 'BREAKFAST' | 'DESERT') {
    this.activeTab = newTab;
    this.dishesStore.loadDishes(newTab);
  }

  constructor(readonly dishesStore: DishesStore) {
    this.dishesStore.loadDishes(this.activeTab);
  }

  addToBucket(dish: Dish): void {
    this.dishesStore.addToBucket(dish.id);
  }

  removeFromBucket(dish: Dish): void {
    this.dishesStore.removeFromBucket(dish.id);
  }
}
