import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';
import { FoodService } from '../services/food.service';
import * as mapboxgl from 'mapbox-gl';

declare var require: any

var listinn = [];

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

   

   var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});
        map.on('load', function () {
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));

            map.addControl(new mapboxgl.NavigationControl());

          map.addSource('naut', {
              type: 'vector',
              url: 'mapbox://dagsson.cj98f0o860q2w33t4cyvvfhib-5qqz2'
          });
          map.addLayer({
              'id': 'Nautgripir',
              'type': 'circle',
              'source': 'naut',
              'imgsource': '../assets/img/cow.png',
              'layout': {
                  'visibility': 'none'
              },
              'paint': {
                  'circle-radius': {
                      'base': 2,
                      'stops': [[8, 3], [16, 180]]
                  },
                  'circle-color': 'rgb(84,48,5)'
              },
              'source-layer': 'nautgripir_merged'
          });
          map.on('click', 'Nautgripir', function (e) {
              document.getElementById('info').innerHTML = e.features[0].properties.Name;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
              document.getElementById('foodtypeII').innerHTML = e.features[0].properties.ProductII;
              document.getElementById('location').innerHTML = e.features[0].properties.Area;
              document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
              document.getElementById('foodinc').setAttribute( 'src', '../assets/img/011-animals.png' );
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'Nautgripir', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'Nautgripir', function () {
              map.getCanvas().style.cursor = '';
              popup.remove();
          });
      
          map.addSource('kind', {
              type: 'vector',
              url: 'mapbox://dagsson.cjgxs52m90blu2wqn6cn9zm7y-3zxws'
          });
          map.addLayer({
              'id': 'Sauðfé',
              'icon': '',
              'type': 'circle',
              'source': 'kind',
              'layout': {
                  'visibility': 'none'
              },
              'paint': {
                  'circle-radius': {
                      'base': 2,
                      'stops': [[8, 3], [16, 180]]
                  },
                  'circle-color': '#8c510a'
              },
              'source-layer': 'Saudfe_merged'
          });
        
          map.on('click', 'Sauðfé', function (e) {
              document.getElementById('info').innerHTML = e.features[0].properties.Name;
              document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
              document.getElementById('foodtypeII').innerHTML = e.features[0].properties.ProductII;
              document.getElementById('location').innerHTML = e.features[0].properties.Place;
              document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
              document.getElementById('foodinc').setAttribute( 'src', '../assets/img/007-animals-5.png' );
          });
      
          // Change the cursor to a pointer when the mouse is over the states layer.
          map.on('mouseenter', 'Sauðfé', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
          });
      
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'Sauðfé', function () {
              map.getCanvas().style.cursor = '';
              popup.remove();
          });

          // Thorungar

          map.addSource('thorungar', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxsaywq0bdn32mswtdla8f4-8ocuk'
        });
        map.addLayer({
            'id': 'Þörungar',
            'icon': '',
            'type': 'circle',
            'source': 'thorungar',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#bf812d'
            },
            'source-layer': 'Thorungar_merged'
        });
        map.on('click', 'Þörungar', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/003-sea.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Þörungar', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Þörungar', function () {
            map.getCanvas().style.cursor = '';
        });

        // Hross

        map.addSource('hross', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxrynuy1nhn2wmoqz4sn8fu-74xa4'
        });
        map.addLayer({
            'id': 'Hestar',
            'icon': '',
            'type': 'circle',
            'source': 'hross',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#dfc27d'
            },
            'source-layer': 'Hross_merged'
        });
        map.on('click', 'Hestar', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/009-animals-3.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Hestar', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Hestar', function () {
            map.getCanvas().style.cursor = '';
        });

        // Fiskeldi

        map.addSource('fiskeldi', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxrxq5x0bpb2wosmeh8jjvi-7q4sm'
        });
        map.addLayer({
            'id': 'Fiskeldi',
            'icon': '',
            'type': 'circle',
            'source': 'fiskeldi',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#f6e8c3'
            },
            'source-layer': 'Fiskeldi_merged'
        });
        map.on('click', 'Fiskeldi', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/006-food-1.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Fiskeldi', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Fiskeldi', function () {
            map.getCanvas().style.cursor = '';
        });

        // Alifuglar

        map.addSource('alifuglar', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxqopwj0acw2wpew0uzhyxk-6eb44'
        });
        map.addLayer({
            'id': 'Alifuglar',
            'icon': '',
            'type': 'circle',
            'source': 'alifuglar',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#b1200f'
            },
            'source-layer': 'Alifuglar_merged'
        });
        map.on('click', 'Alifuglar', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/008-animals-4.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Alifuglar', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Alifuglar', function () {
            map.getCanvas().style.cursor = '';
        });

        // Skip

        map.addSource('skip', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxs9knd0b292xo8mn0yql01-93dnm'
        });
        map.addLayer({
            'id': 'Skip',
            'icon': '',
            'type': 'circle',
            'source': 'skip',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#fa482e'
            },
            'source-layer': 'Skip_merged'
        });
        map.on('click', 'Skip', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/001-transport.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Skip', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Skip', function () {
            map.getCanvas().style.cursor = '';
        });

        // Geitur

        map.addSource('geitur', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxs6mf10b7m33osu7vpoe1u-5mgi9'
        });
        map.addLayer({
            'id': 'Geitur',
            'icon': '',
            'type': 'circle',
            'source': 'geitur',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#f4a32e'
            },
            'source-layer': 'Geitur_merged'
        });
        map.on('click', 'Geitur', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/002-animals-1.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Geitur', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Geitur', function () {
            map.getCanvas().style.cursor = '';
        });

        // Matjurtir

        map.addSource('matjurtir', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxs04570gnp2qqtqgco9o1z-45m5i'
        });
        map.addLayer({
            'id': 'Matjurtir',
            'icon': '',
            'type': 'circle',
            'source': 'matjurtir',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#80cdc1'
            },
            'source-layer': 'Matjurtir_merged'
        });
        map.on('click', 'Matjurtir', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/004-nature.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Matjurtir', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Matjurtir', function () {
            map.getCanvas().style.cursor = '';
        });

        // Svin

        map.addSource('svin', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxsaekx0cdv33o8zncly704-062up'
        });
        map.addLayer({
            'id': 'Svín',
            'icon': '',
            'type': 'circle',
            'source': 'svin',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#35978f'
            },
            'source-layer': 'Svin_merged'
        });
        map.on('click', 'Svín', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/010-animals-2.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Svín', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Svín', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        // Skelfiskur

        map.addSource('skelfiskur', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxs7hoc07ly2wmx7wc7qjz9-134iq'
        });
        map.addLayer({
            'id': 'Skelfiskur',
            'icon': '',
            'type': 'circle',
            'source': 'skelfiskur',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[8, 3], [16, 180]]
                },
                'circle-color': '#01665e'
            },
            'source-layer': 'Skelfiskur_merged'
        });
        map.on('click', 'Skelfiskur', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:30px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/005-food.png' );
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Skelfiskur', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(e.features[0].properties.Name)
                .addTo(map);
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Skelfiskur', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        
          
      });
      
      var toggleableLayerIds = [ 'Nautgripir', 'Sauðfé', 'Þörungar', 'Hestar', 'Fiskeldi', 'Alifuglar', 'Skip', 'Geitur', 'Matjurtir', 'Svín', 'Skelfiskur' ];
      
      for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];
          var foodicon = document.createElement('img');
          var link = document.createElement('a');
          var listar = [];
          link.textContent = id;
          link.appendChild(foodicon);
          link.style.color = "black";
          link.style.backgroundColor = "white";
          link.style.padding = "20px";
          link.style.fontFamily = "Source Sans Pro";
          link.onclick = function (e) {  
            
            var clickedLayer = this.textContent;
              e.preventDefault();
              e.stopPropagation();
              var bgColor = map.getPaintProperty(clickedLayer, 'circle-color');
              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
              console.log(clickedLayer);
              if (visibility === 'none') {
                  this.className = 'pp-tab';
                  map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                  this.style.color = "white";
                  this.style.backgroundColor = bgColor;           
              } else {
                  this.className = 'pp-tab active';
                  map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  this.style.color = "black";
                  this.style.borderColor = "lightgray";
                  this.style.backgroundColor = "white";
              }
          };
      
          var layers = document.getElementById('menu');
          layers.appendChild(link);

      }
  }

}
