import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WindowState} from "../model/windowState.model";
import {WindowService} from "../service/window.service";

@Component({
  selector: 'window-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  windowSubscription: Subscription;

  showPage: WindowState;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
    this.windowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    );
    this.showPage = this.windowService.assetWindow;
  }

  ngOnDestroy(): void {
    this.windowSubscription.unsubscribe();
  }

  public closeWindow(): void {
    this.windowService.changeWindow(WindowState.None);
  }

  public showMapLoad(): boolean {
    return this.showPage === WindowState.LoadMap;
  }

  public showMapSettings(): boolean {
    return this.showPage === WindowState.MapSettings;
  }

  public showMapNew(): boolean {
    return this.showPage === WindowState.NewMap;
  }

  public windowTitle(): string {
    if (this.showPage === WindowState.NewMap) return 'New Map';
    if (this.showPage === WindowState.LoadMap) return 'Load Map';
    if (this.showPage === WindowState.SaveMap) return 'Save Map';
    if (this.showPage === WindowState.MapSettings) return 'Map Settings';
    return 'Settings';
  }
}
