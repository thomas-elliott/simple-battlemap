import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsComponent} from './assets.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {IconsComponent} from './icons/icons.component';
import {UploadWindowComponent} from './upload-window/upload-window.component';
import {TokenWindowComponent} from './token-window/token-window.component';
import {BackgroundWindowComponent} from './background-window/background-window.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AssetsComponent,
    IconsComponent,
    UploadWindowComponent,
    TokenWindowComponent,
    BackgroundWindowComponent,
    DeleteDialogComponent],
  exports: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class AssetsModule {
}
