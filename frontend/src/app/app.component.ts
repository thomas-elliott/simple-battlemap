import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WindowService} from "./service/window.service";
import {WindowState} from "./model/windowState.model";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Simple Battlemap';

  assetWindowSubscription: Subscription;

  showPage = WindowState.None;

  constructor(private windowService: WindowService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.assetWindowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    );
    this.windowService.changeWindow(WindowState.Login);
  }

  ngOnDestroy(): void {
    this.assetWindowSubscription.unsubscribe();
  }

  isDm(): boolean {
    return this.authService.isDm();
  }

  isPlayer(): boolean {
    return this.authService.isPlayer();
  }

  showAssetWindow() {
    return this.showPage === WindowState.AssetBackground ||
      this.showPage === WindowState.AssetToken ||
      this.showPage === WindowState.AssetUpload;
  }

  showSettingsWindow() {
    return this.showPage === WindowState.LoadMap ||
      this.showPage === WindowState.SaveMap ||
      this.showPage === WindowState.MapSettings
  }

  showLogin() {
    return this.showPage === WindowState.Login;
  }
}
