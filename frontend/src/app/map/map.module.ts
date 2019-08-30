import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { GridCanvasComponent } from './grid-canvas/grid-canvas.component';
import { MapCanvasComponent } from './map-canvas/map-canvas.component';
import { TokenCanvasComponent } from './token-canvas/token-canvas.component';

@NgModule({
  declarations: [MapComponent, GridCanvasComponent, MapCanvasComponent, TokenCanvasComponent],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
