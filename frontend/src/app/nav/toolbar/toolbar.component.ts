import {Component, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {WindowState} from "../../model/windowState.model";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  authenticationSubscription: Subscription;
  authenticated: boolean;
  role: string;

  constructor(private windowService: WindowService,
              private authService: AuthService,
              private mapService: MapService) {}

  ngOnInit(): void {
    this.authenticationSubscription = this.authService.authenticationChanged.subscribe(
      (response: boolean) => {
        this.checkRole();
        this.authenticated = response;
        if (this.authenticated && this.windowService.assetWindow === WindowState.Login) {
          this.windowService.changeWindow(WindowState.None);
        }
      }
    );

    // Check auth at beginning
    this.authService.checkAuthentication();
  }

  ngOnDestroy(): void {
    this.authenticationSubscription.unsubscribe();
  }

  checkRole() {
    if (this.authService.isDm()) {
      this.role = "DM";
    } else if (this.authService.isPlayer()) {
      this.role = "Player";
    } else {
      this.role = "Unauthenticated";
    }
  }

  showLogin() {
    this.windowService.changeWindow(WindowState.Login);
  }

  loadMap() {
    this.windowService.changeWindow(WindowState.LoadMap);
  }

  newMap() {

  }

  saveMap() {
    this.mapService.saveMap();
  }
}
