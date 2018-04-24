import { Injectable } from '@angular/core';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';

@Injectable()
export class FoodService {

  constructor() { }

  getFood(): EIFood[] {
    console.log(FOOD_LIST);
    return FOOD_LIST;
  }
}
