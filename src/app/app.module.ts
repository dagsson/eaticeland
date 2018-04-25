import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { FoodService } from './services/food.service';
import { MapService } from './services/map.service';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FoodService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
