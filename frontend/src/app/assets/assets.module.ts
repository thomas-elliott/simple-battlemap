import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsComponent} from './assets.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { IconsComponent } from './icons/icons.component';


@NgModule({
  declarations: [
    AssetsComponent,
    IconsComponent],
  exports: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class AssetsModule {
}
