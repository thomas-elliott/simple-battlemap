import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {WindowService} from "./service/window.service";
import {WindowState} from "./model/windowState.model";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple Battlemap';

  assetWindowSubscription: Subscription;

  showPage = WindowState.None;

  constructor(private windowService: WindowService,
              private authService: AuthService) { }

  ngOnInit() {
    this.assetWindowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    );
    this.windowService.changeAssetWindow(WindowState.Login);
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

  showLogin() {
    return this.showPage === WindowState.Login;
  }
}
