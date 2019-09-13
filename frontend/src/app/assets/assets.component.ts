import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {WindowService} from "../service/window.service";
import {renderConstantPool} from "@angular/compiler-cli/ngcc/src/rendering/renderer";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  iconSize: number = 128;

  assetWindowSubscription: Subscription;

  showPage: string;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.assetWindowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    );

    if (!this.showPage) {
      this.showPage = this.windowService.assetWindow;
    }
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

  clickDelete() {

  }

  clickUpload() {
    if (this.showPage === "upload") {
      this.showPage = "token";
    } else {
      this.showPage = "upload"
    }
  }

  clickPick() {

  }

  closeWindow() {
    this.windowService.changeAssetWindow('');
  }
}
