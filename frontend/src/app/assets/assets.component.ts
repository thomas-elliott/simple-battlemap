import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  iconSize: number = 128;

  constructor() { }

  ngOnInit() {
  }

  zoomOut() {
    if (this.iconSize > 32) {
      this.iconSize = this.iconSize - 32;
    }
  }

  zoomIn() {
    if (this.iconSize < 128) {
      this.iconSize = this.iconSize + 32;
    }
  }
}
