import { Component, OnInit } from '@angular/core';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST } from '../shared/mock-food';
//import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  food = FOOD_LIST;

  constructor() { 

  }

  ngOnInit() {
  }

}
