import { Injectable } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {WindowState} from "../model/windowState.model";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  assetWindowChanged = new Subject<WindowState>();

  assetWindow: WindowState;

  constructor() { }

  notifyAssetWindowChanged() {
    return this.assetWindowChanged.next(this.assetWindow);
  }

  changeAssetWindow(window: WindowState) {
    this.assetWindow = window;
    this.notifyAssetWindowChanged();
  }
}
