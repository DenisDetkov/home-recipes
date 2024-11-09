import {Component, forwardRef} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from "@angular/forms";
import {Ingredient} from "../../../_models/ingredient";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IngredientsComponent),
      multi: true,
    },
  ]
})
export class IngredientsComponent implements ControlValueAccessor, Validator {
  ingredients: Ingredient[] = [];
  opened = false;

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  form: FormGroup = this.fb.group({
    blocks: this.fb.array([])
  });

  constructor(public fb: FormBuilder) {
  }

  writeValue(value: any) {
    this.ingredients = value ? value : [];
    if (value) this.fillForm();
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  // @ts-ignore
  validate(control: AbstractControl): ValidationErrors | null {
    setTimeout(() => {
      if (this.form.invalid) {
        control.setErrors({notFilled: true})
        return {notFilled: true};
      } else {
        control.setErrors(null);
        return null;
      }
    }, 0);
  }

  addNew() {
    let newAnchor = new Ingredient();
    let newGroup = this.fb.group({
      name: [null, Validators.required],
      quantity: [1, Validators.required],
      type: [null, Validators.required]
    });

    this.ingredients.push(newAnchor);
    this.bind(newGroup, newAnchor);
    this.getArray().push(newGroup);
    this.onChange(this.ingredients);
  }

  remove(i: number) {
    this.ingredients.splice(i, 1);
    this.getArray().removeAt(i);
    this.onChange(this.ingredients);
  }

  fillForm() {
    this.ingredients.forEach(e => {
      let newGroup = this.fb.group({
        name: [e.name, Validators.required],
        quantity: [e.quantity, Validators.required],
        type: [e.type, Validators.required]
      });
      this.bind(newGroup, e);
      this.getArray().push(newGroup);
    })
  }

  getArray(): FormArray {
    return this.form.controls['blocks'] as FormArray;
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  bind(formGroup: FormGroup, object: Ingredient) {
    formGroup.valueChanges.subscribe((res) => {
      object.name = formGroup.controls['name'].value!;
      object.quantity = formGroup.controls['quantity'].value!;
      object.type = formGroup.controls['type'].value!;
      this.onChange(this.ingredients);
    })
  }
}
