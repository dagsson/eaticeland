import { Component, OnInit } from '@angular/core';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST } from '../shared/mock-food';
import { MapService } from '../services/map.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  values = '';
  
    onKey(event: any) { // without type info

      this.values += event.target.value;
      (console.log(this.values));
    }

  food = FOOD_LIST;
  constructor(private _mapService: MapService) { 

  }

  ngOnInit() {

      
  }

}
