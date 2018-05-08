import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';
import { FoodService } from '../services/food.service';
import * as mapboxgl from 'mapbox-gl';


var apiToken = environment.MAPBOX_API_KEY;


@Injectable()
export class MapService {

  constructor() {
  }

  getMap() {
   var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); 
   mapboxgl.accessToken = apiToken
   var map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8',
   zoom: 5.55,
   minZoom: 5.6,
   center: [-19.058391, 64.970529]
   });
        map.on('load', function () {
          map.addSource('naut', {
              type: 'vector',
              url: 'mapbox://dagsson.cjgs5txtr0can33pay8boe6r3-209zm'
          });
          map.addLayer({
              'id': 'Nautgripir',
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
              'source-layer': 'nautgripir_test'
          });
          map.on('click', 'Nautgripir', function (e) {
              new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.Address)
                  .addTo(map);
              document.getElementById('info').innerHTML = e.features[0].properties.Address;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Type;
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'Nautgripir', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'Nautgripir', function () {
              map.getCanvas().style.cursor = '';
          });
      
          map.addSource('kind', {
              type: 'vector',
              url: 'mapbox://dagsson.cj9a68xf3187g2qor841q1dx9-1gl9e'
          });
          map.addLayer({
              'id': 'Sauðfé',
              'icon': '',
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
          map.on('click', 'Sauðfé', function (e) {
              new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.Stodvarnafn)
                  .addTo(map);
              document.getElementById('info').innerHTML = e.features[0].properties.Stodvarnafn;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Tegund;
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'Sauðfé', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'Sauðfé', function () {
              map.getCanvas().style.cursor = '';
          });

          
      });

      


      
      var toggleableLayerIds = [ 'Nautgripir', 'Sauðfé' ];
      
      for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];

          var foodicon = document.createElement('img');
      
          var link = document.createElement('li');
          //link.href = '#';
          link.className = 'active';
          link.textContent = id;
          link.appendChild(foodicon);
      
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
