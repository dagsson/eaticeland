import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { FoodService } from './services/food.service';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
