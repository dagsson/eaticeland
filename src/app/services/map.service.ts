import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';
import { FoodService } from '../services/food.service';
import * as mapboxgl from 'mapbox-gl';


var apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [64.970529, -19.058391]
const defaultZoom: number = 5.55

@Injectable()
export class MapService {

  constructor() {
  }

  getMap() {
    var map = L.map('map').setView(defaultCoords, defaultZoom);
    
        map.maxZoom = 100;
    
        L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.light',
          accessToken: apiToken
        }).addTo(map);

        map.on('load', function () {
          map.addSource('naut', {
              type: 'vector',
              url: 'mapbox://dagsson.cj98f0o860q2w33t4cyvvfhib-2egtj'
          });
          map.addLayer({
              'id': 'naut',
              'type': 'circle',
              'source': 'naut',
              'layout': {
                  'visibility': 'visible'
              },
              'paint': {
                  'circle-radius': {
                      'base': 2,
                      'stops': [[5.55, 2], [16, 180]]
                  },
                  'circle-color': 'rgba(55,148,179,1)'
              },
              'source-layer': 'naut_test'
          });
          map.on('click', 'naut', function (e) {
              new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.Stodvarnafn)
                  .addTo(map);
              document.getElementById('info').innerHTML = e.features[0].properties.Stodvarnafn;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Tegund;
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'naut', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'naut', function () {
              map.getCanvas().style.cursor = '';
          });
      
          map.addSource('kind', {
              type: 'vector',
              url: 'mapbox://dagsson.cj9a68xf3187g2qor841q1dx9-1gl9e'
          });
          map.addLayer({
              'id': 'kind',
              'type': 'circle',
              'source': 'kind',
              'layout': {
                  'visibility': 'visible'
              },
              'paint': {
                  'circle-radius': {
                      'base': 2,
                      'stops': [[5.55, 2], [16, 180]]
                  },
                  'circle-color': 'orange'
              },
              'source-layer': 'kind_test'
          });
          map.on('click', 'kind', function (e) {
              new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.Stodvarnafn)
                  .addTo(map);
              document.getElementById('info').innerHTML = e.features[0].properties.Stodvarnafn;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Tegund;
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'kind', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'kind', function () {
              map.getCanvas().style.cursor = '';
          });
      });
      
      var toggleableLayerIds = [ 'naut', 'kind' ];
      
      for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];
      
          var link = document.createElement('a');
          link.href = '#';
          link.className = 'active';
          link.textContent = id;
      
          link.onclick = function (e) {
              var clickedLayer = this.textContent;
              e.preventDefault();
              e.stopPropagation();
      
              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
      
              if (visibility === 'visible') {
                  map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  this.className = '';
              } else {
                  this.className = 'active';
                  map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
              }
          };
      
          var layers = document.getElementById('menu');
          layers.appendChild(link);
      }
  }

}
