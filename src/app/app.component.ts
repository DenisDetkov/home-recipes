import { Component } from '@angular/core';
import {DishesStore} from "./components/dishes/dishes.store";
import {Dish} from "./_models/dish";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DishesStore]
})
export class AppComponent {
  newDishFormOpened = false;
  bucketOpened = false;
  dishToEdit: Dish;

  constructor(readonly dishesStore: DishesStore) {
  }

  addNewDish(dish: Dish) {
    this.dishesStore.addDish(dish);
    this.newDishFormOpened = false;
  }

  updateDish(dish: Dish) {
    this.dishesStore.updateDish(dish);
    this.dishToEdit = null;
  }
}
