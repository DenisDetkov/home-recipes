import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Dish} from "../../_models/dish";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DishService} from "../../_service/dish.service";
import {modalAnimation} from "../../config/constants";

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html',
  styleUrls: ['./new-dish.component.scss'],
  animations: [modalAnimation]
})
export class NewDishComponent {
  @HostBinding('@modalAnimation') modalAnimation: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() created: EventEmitter<Dish> = new EventEmitter();
  @Output() updated: EventEmitter<Dish> = new EventEmitter();

  private _dish: Dish = new Dish();


  get dish(): Dish {
    return this._dish;
  }

  @Input()
  set dish(value: Dish) {
    this._dish = {...value};
    this.fillForm();
  }

  dishForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dishService: DishService) {
    this.fillForm();
  }

  submit() {
    if (this.dishForm.invalid) return;

    if (this.dish.id) this.dishService.updateDish(this.dish).subscribe(dish => this.updated.emit(dish));
    else this.dishService.addDish(this._dish).subscribe((data) => this.created.emit(data))
  }

  fillForm() {
    this.dishForm = this.fb.group({
      image: [this.dish.image, [Validators.required]],
      name: [this.dish.name, [Validators.required]],
      description: [this.dish.description, [Validators.required]],
      type: [this.dish.type || 'MAIN', [Validators.required]],
      ingredients: [this.dish.ingredients || [], [Validators.required]],
    });
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges() {
    this.dishForm.valueChanges.subscribe(() => {
      this._dish.name = this.dishForm.controls['name'].value;
      this._dish.image = this.dishForm.controls['image'].value;
      this._dish.description = this.dishForm.controls['description'].value;
      this._dish.type = this.dishForm.controls['type'].value;
      this._dish.ingredients = this.dishForm.controls['ingredients'].value;
    })
  }
}
