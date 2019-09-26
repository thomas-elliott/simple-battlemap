import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {WindowState} from "../model/windowState.model";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  assetWindowChanged = new Subject<WindowState>();

  assetWindow: WindowState;

  constructor() { }

  notifyWindowChanged() {
    console.log(`Window changing to ${this.assetWindow}`);
    return this.assetWindowChanged.next(this.assetWindow);
  }

  changeWindow(window: WindowState) {
    this.assetWindow = window;
    this.notifyWindowChanged();
  }
}
