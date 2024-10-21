import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private http: HttpClient) { }

  applyBucket(dishesIds: number[]) {
    return this.http.post(`${apiUrl}/bucket`, null, {params: {dishesIds}});
  }
}
