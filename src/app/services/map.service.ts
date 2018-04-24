import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';
import { FoodService } from '../services/food.service';

var apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;

var map = L.map('map').setView(defaultCoords, defaultZoom);

@Injectable()
export class MapService {

  constructor() { }

}
