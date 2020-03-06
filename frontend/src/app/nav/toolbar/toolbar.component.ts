import {Component, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {WindowState} from "../../model/windowState.model";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";
import {SessionInfo} from "../../model/sessionInfo.model";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  authenticationSubscription: Subscription;
  authenticated: boolean;
  role: string;
  sessionListSubscription: Subscription;
  sessionList: SessionInfo[];

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

    this.sessionListSubscription = this.authService.sessionListChanged.subscribe(
      (response: SessionInfo[]) => {
        console.debug('Session list updated');
        this.sessionList = response;
      }
    );

    // Check auth at beginning
    this.authService.checkAuthentication();
    this.authService.getSessionList();
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
    this.windowService.changeWindow(WindowState.NewMap);
  }

  saveMap() {
    this.mapService.saveMap();
  }

  showSettings() {
    this.windowService.changeWindow(WindowState.MapSettings);
  }

  getSession() {
    return this.authService.currentSession();
  }

  newSession() {
    this.authService.newSession();
  }

  logout() {
    this.authService.logout();
  }

  loadSession(sessionId: number) {
    this.authService.loadSession(sessionId);
  }

  // TODO: WS to update?
  refreshSession() {
    this.authService.getSessionList();
  }
}
