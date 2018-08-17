import { Component, OnInit } from '@angular/core';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST } from '../shared/mock-food';
import { MapService } from '../services/map.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private token = 'pk.eyJ1IjoiZGFnc3NvbiIsImEiOiJjajk0MTRqdWIzZGxwMzNycGtreDhxMmRxIn0.0zk_7FSvF_LlQ0AD2cChWQ';
  private urls = ['https://api.mapbox.com/datasets/v1/dagsson/cjgxs7hoc07ly2wmx7wc7qjz9/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxrynuy1nhn2wmoqz4sn8fu/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxsaekx0cdv33o8zncly704/features'];
  filtered = [];
  showDropDown = false;
  list: any;
  private test: object;
  food = FOOD_LIST;

  response: any;
  posts: any;

  constructor(
    private http: HttpClient,
    private _mapService: MapService
  ) { }

 ngOnInit() {
      
  }

 selectValue(p) {
  var inputElement = <HTMLInputElement>document.getElementById('theinput');
  inputElement.value = p;
  this.showDropDown = false;
 }

 onKey(e) {
  this.showDropDown = true;
  var value = e.target.value.trim().toLowerCase();
  for (var i in this.urls) {
    this.http.get(this.urls[i]+ '?access_token=' + this.token).subscribe(val => {this.response= val['features'];
    this.posts = this.response.map(response => response.properties.Name.trim().toLowerCase());
   });
  };
  this.filtered = this.posts.filter(post => post.indexOf(value) > -1 && value.length > 2);
 }

}