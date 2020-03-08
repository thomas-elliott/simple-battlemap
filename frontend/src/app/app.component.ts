import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WindowService} from "./service/window.service";
import {WindowState} from "./model/windowState.model";
import {AuthService} from "./service/auth.service";
import {SessionInfo} from "./model/sessionInfo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Simple Battlemap';

  assetWindowSubscription: Subscription;
  sessionSubscription: Subscription;

  sessionInfo: SessionInfo;
  showPage = WindowState.None;

  constructor(private windowService: WindowService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.sessionSubscription = this.authService.sessionChanged.subscribe(
      (response: SessionInfo) => {
        this.sessionInfo = response;
      }
    );
    this.authService.getSession();

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
      this.showPage === WindowState.MapSettings ||
      this.showPage === WindowState.NewMap
  }

  showLogin() {
    return this.showPage === WindowState.Login;
  }

  showRegister() {
    return this.showPage === WindowState.Register;
  }
}
