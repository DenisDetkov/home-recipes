import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../_models/dish";
import {apiUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishesByType(type: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${apiUrl}/dish`, {params: {type}})
  }

  getDishesByIds(ids: number[]): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${apiUrl}/dish/list`, {params: {ids}})
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${apiUrl}/dish`, dish);
  }

  updateDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${apiUrl}/dish`, dish);
  }

  deleteDish(dishId: number) {
    return this.http.delete(`${apiUrl}/dish`, {params: {dishId}});
  }
}
