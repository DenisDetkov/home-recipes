import { Component } from '@angular/core';
import {SwiperOptions} from "swiper";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent {
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

  activeTab: 'main' | 'breakfasts' | 'deserts' = 'main'
}
