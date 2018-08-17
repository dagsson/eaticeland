import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EIFood } from '../shared/food.model';
import { FOOD_LIST} from '../shared/mock-food';
import { FoodService } from '../services/food.service';
import { GeoJson } from '../map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

declare var require: any

var listinn = [];

var apiToken = environment.MAPBOX_API_KEY;
@Injectable()
export class MapService {
  public producer: object; 
  public setTest(value: object) {
      this.producer = value;
      console.log(this.producer.geometry.coordinates);
  }

  constructor (
    private http: HttpClient
  ) {}

getMap() {
  var http = this.http;
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); 
  mapboxgl.accessToken = apiToken
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8',
  zoom: 5.55,
  minZoom: 5.6,
  center: [-19.058391, 64.970529]
  });
  
  map.addControl(new mapboxgl.AttributionControl(), 'top-left');
  var inputElement = <HTMLInputElement>document.getElementById('theinput');
  var listingEl = document.getElementById('feature-listing');
  var searchBtn = document.getElementById('leit-btn');
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 12
    });
  }

  searchBtn.addEventListener('click', function(r) {
    var token = 'pk.eyJ1IjoiZGFnc3NvbiIsImEiOiJjajk0MTRqdWIzZGxwMzNycGtreDhxMmRxIn0.0zk_7FSvF_LlQ0AD2cChWQ';
    var urls = ['https://api.mapbox.com/datasets/v1/dagsson/cjgxs7hoc07ly2wmx7wc7qjz9/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxrynuy1nhn2wmoqz4sn8fu/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxsaekx0cdv33o8zncly704/features'];
    var goTo = inputElement.value;
    var response;
    for (var i in urls) {
        http.get(urls[i]+ '?access_token=' + token).subscribe(val => {response= val['features'];
        goToPoint(response, goTo);
       });
      };
  });

  function goToPoint(obj, name) {
    for (var i = 0; i < obj.length; i++)
    if (obj[i].properties.Name.toLowerCase() === name) {
     flyToStore(obj[i]);
    }
  return null;
  }

  map.on('load', function () {
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }), 'bottom-right');

            var nav = new mapboxgl.NavigationControl();
            map.addControl(nav, 'bottom-right');

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
                      'stops': [[3, 3], [16, 32]]
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
              document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
              document.getElementById('foodinc').setAttribute( 'src', '../assets/img/011-animals-w.png' );
              document.getElementById('card-heading').setAttribute( 'style', 'background-color: rgb(84,48,5)' );
              var clickedPoint = e.features[0];
              flyToStore(clickedPoint);
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
                      'stops': [[3, 3], [16, 32]]
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
              document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
              document.getElementById('foodinc').setAttribute( 'src', '../assets/img/007-animals-5-w.png' );
              document.getElementById('card-heading').setAttribute( 'style', 'background-color: #8c510a' );
              var clickedPoint = e.features[0];
              flyToStore(clickedPoint);
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#bf812d'
            },
            'source-layer': 'Thorungar_merged'
        });
        map.on('click', 'Þörungar', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/003-sea-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #bf812d' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
       // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Þörungar', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Þörungar', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#A57D28'
            },
            'source-layer': 'Hross_merged'
        });
        map.on('click', 'Hestar', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/009-animals-3-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #A57D28' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Hestar', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Hestar', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#dea613'
            },
            'source-layer': 'Fiskeldi_merged'
        });
        map.on('click', 'Fiskeldi', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/006-food-1-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #dea613' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Fiskeldi', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Fiskeldi', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#b1200f'
            },
            'source-layer': 'Alifuglar_merged'
        });
        map.on('click', 'Alifuglar', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/008-animals-4-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #b1200f' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Alifuglar', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Alifuglar', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#fa482e'
            },
            'source-layer': 'Skip_merged'
        });
        map.on('click', 'Skip', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Type;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Size;
            document.getElementById('location').innerHTML = e.features[0].properties.Place;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/001-transport-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #fa482e' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'Skip', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Skip', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#f4a32e'
            },
            'source-layer': 'Geitur_merged'
        });
        map.on('click', 'Geitur', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/002-animals-1-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #f4a32e' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Geitur', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Geitur', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#80cdc1'
            },
            'source-layer': 'Matjurtir_merged'
        });
        map.on('click', 'Matjurtir', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/004-nature-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #80cdc1' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
       map.on('mouseenter', 'Matjurtir', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();

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
      map.on('mouseleave', 'Matjurtir', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
      });


        // Svin

        map.addSource('svin', {
            type: 'vector',
            url: 'mapbox://dagsson.cjgxsaekx0cdv33o8zncly704-062up'
        });
        var svin = map.addLayer({
            'id': 'Svín',
            'icon': '../assets/img/010-animals-2.png',
            'type': 'circle',
            'source': 'svin',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-radius': {
                    'base': 2,
                    'stops': [[3, 3], [16, 32]]
                },
                'circle-color': '#35978f'
            },
            'source-layer': 'Svin_merged'
        });
        map.on('click', 'Svín', function (e) {
            document.getElementById('info').innerHTML = e.features[0].properties.Name;
            document.getElementById('foodtype').innerHTML = e.features[0].properties.Product;
            document.getElementById('foodtypeII').innerHTML = e.features[0].properties.Info;
            document.getElementById('location').innerHTML = e.features[0].properties.Area;
            document.getElementById('dashboard').setAttribute( 'style', 'bottom:115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/010-animals-2-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #35978f' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
            console.log(svin);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Svín', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
    
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
                    'stops': [[3, 3], [16, 32]]
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
            document.getElementById('dashboard').setAttribute( 'style', 'bottom: 115px');
            document.getElementById('foodinc').setAttribute( 'src', '../assets/img/005-food-w.png' );
            document.getElementById('card-heading').setAttribute( 'style', 'background-color: #01665e' );
            var clickedPoint = e.features[0];
            flyToStore(clickedPoint);
        });
    
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Skelfiskur', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
    
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

      var tabImg = [ '../assets/img/011-animals.png', '../assets/img/007-animals-5.png', '../assets/img/003-sea.png', '../assets/img/009-animals-3.png', '../assets/img/006-food-1.png', '../assets/img/008-animals-4.png', '../assets/img/001-transport.png', '../assets/img/002-animals-1.png', '../assets/img/004-nature.png', '../assets/img/010-animals-2.png', '../assets/img/005-food.png'];
      var toggleableLayerIds = [ 'Nautgripir', 'Sauðfé', 'Þörungar', 'Hestar', 'Fiskeldi', 'Alifuglar', 'Skip', 'Geitur', 'Matjurtir', 'Svín', 'Skelfiskur' ];
      

      for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];
          var foodicon = document.createElement('img');
          var link = document.createElement('a');
          link.textContent = id;
          link.appendChild(foodicon);
          link.style.display = "grid";
          link.style.color = "black";
          link.style.backgroundColor = "white";
          link.style.padding = "15px";
          link.style.fontFamily = "Source Sans Pro";
          link.style.width = '90px';
          foodicon.setAttribute( 'src', tabImg[i]);
          foodicon.style.height = "25px";
          foodicon.style.margin = "10px auto 0px";
          foodicon.style.opacity = "0.3";
          var features = map.getSource('skelfiskur');
          
          link.onclick = function (e) {  
            console.log(map.getSource('hross'));
            var clickedLayer = this.textContent;
              e.preventDefault();
              e.stopPropagation();
              var bgColor = map.getPaintProperty(clickedLayer, 'circle-color');
              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

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
      
  })
  };
};