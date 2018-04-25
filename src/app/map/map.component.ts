import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { EIFood } from '../shared/food.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private _mapService: MapService) { }

  food: any;

  ngOnInit() {
    this._mapService.getMap()
  }

}
