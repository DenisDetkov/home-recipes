import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SwiperModule} from "swiper/angular";
import { NewDishComponent } from './components/new-dish/new-dish.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { IngredientsComponent } from './components/new-dish/ingredients/ingredients.component';
import {HeaderComponent} from "./components/header/header.component";
import {HeroComponent} from "./components/hero/hero.component";
import {DishesComponent} from "./components/dishes/dishes.component";
import { BucketComponent } from './components/bucket/bucket.component';
import { BucketFloatComponent } from './components/bucket-float/bucket-float.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    DishesComponent,
    NewDishComponent,
    IngredientsComponent,
    BucketComponent,
    BucketFloatComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
