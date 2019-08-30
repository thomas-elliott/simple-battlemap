import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';



@NgModule({
  declarations: [CanvasComponent],
  exports: [
    CanvasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
