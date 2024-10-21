import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {filter, switchMap, withLatestFrom} from "rxjs";
import {DishService} from "../../_service/dish.service";
import {Dish} from "../../_models/dish";

export interface DishesState {
  dishes: Map<'MAIN' | 'BREAKFAST' | 'DESERT', Dish[]> | null;
  bucket: number[];
}

@Injectable({ providedIn: 'root' })
export class DishesStore extends ComponentStore<DishesState>{

  constructor(
    private dishService: DishService
  ) {
    super({
      dishes: new Map,
      bucket: JSON.parse(localStorage.getItem("bucket")  || '[]')
    });
  }

  readonly loadDishes = this.effect<'MAIN' | 'BREAKFAST' | 'DESERT'>(dishType$ =>
    dishType$.pipe(
      withLatestFrom(this.state$),
      filter(([dishType, state]) => !state.dishes.has(dishType)),
      switchMap(([dishType]) =>
        this.dishService.getDishesByType(dishType).pipe(
          tapResponse(
            dishes => {
              this.patchState(state => {
                const newDishes = new Map(state.dishes);
                newDishes.set(dishType, dishes);
                return { dishes: newDishes };
              });
            },
            error => {
              // Обработка ошибки
              console.error('Ошибка загрузки блюд:', error);
            }
          )
        )
      )
    )
  );

  // Selectors
  readonly dishes$ = this.select((state) => state.dishes);
  readonly bucket$ = this.select((state) => {
    return state.bucket
  });

  readonly addDish = this.updater((state, dish: Dish) => {
    const newDishes = new Map(state.dishes);
    const dishesArray = newDishes.get(dish.type) || [];
    newDishes.set(dish.type, [...dishesArray, dish]);
    return {...state, dishes: newDishes};
  });

  // Метод для удаления блюда из определенного типа блюд
  readonly deleteDish = this.updater((state, dish: Dish) => {
      const newDishes = new Map(state.dishes);
      const dishesArray = newDishes.get(dish.type) || [];
      newDishes.set(
        dish.type,
        dishesArray.filter(dish => dish.id !== dish.id)
      );
      return {...state, dishes: newDishes};
    }
  );

  // Метод для изменения блюда в определенном типе блюд
  readonly updateDish = this.updater((state, dish: Dish) => {
    const newDishes = new Map(state.dishes);

    for (const [typeKey, dishesArray] of newDishes.entries()) {
      newDishes.set(typeKey, dishesArray.filter(d => d.id !== dish.id));
    }

    const updatedTypeDishesArray = newDishes.get(dish.type) || [];
    newDishes.set(dish.type, [...updatedTypeDishesArray, dish]);

    return { ...state, dishes: newDishes };
  });

  readonly addToBucket = this.updater((state, dishId: number) => {
    const updatedBucket = [...state.bucket];
    updatedBucket.push(dishId);
    localStorage.setItem("bucket", JSON.stringify(updatedBucket));
    return { ...state, bucket: updatedBucket };
  });

  readonly removeFromBucket = this.updater((state, dishId: number) => {
    const updatedBucket = state.bucket.filter((dish) => dish !== dishId);
    localStorage.setItem("bucket", JSON.stringify(updatedBucket));
    return { ...state, bucket: updatedBucket };
  });

  readonly clearBucket = this.updater((state) => {
    localStorage.setItem("bucket", JSON.stringify([]));
    return { ...state, bucket: [] };
  });
}
