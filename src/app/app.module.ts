import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { FoodService } from './services/food.service';
import { MapService } from './services/map.service';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1IjoiZGFnc3NvbiIsImEiOiJjajk0MTRqdWIzZGxwMzNycGtreDhxMmRxIn0.0zk_7FSvF_LlQ0AD2cChWQ', // Can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [FoodService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
