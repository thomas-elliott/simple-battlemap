import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaletteComponent} from './palette/palette.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [PaletteComponent, ToolbarComponent],
    imports: [
        CommonModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTooltipModule,
        MatMenuModule
    ],
  exports: [
    PaletteComponent,
    ToolbarComponent
  ]
})
export class NavModule { }
