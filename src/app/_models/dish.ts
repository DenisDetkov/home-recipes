import {Ingredient} from "./ingredient";

export class Dish {
  id: number;
  name: string;
  description: string;
  type: 'MAIN' | 'BREAKFAST' | 'DESERT';
  image: string;
  ingredients: Ingredient[] = [];
}
