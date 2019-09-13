import { Injectable } from '@angular/core';
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  assetWindowChanged = new Subject<string>();

  assetWindow: string;

  constructor() { }

  notifyAssetWindowChanged() {
    return this.assetWindowChanged.next(this.assetWindow);
  }

  changeAssetWindow(window: string) {
    this.assetWindow = window;
    this.notifyAssetWindowChanged();
  }
}
