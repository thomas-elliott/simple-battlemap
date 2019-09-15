import {Component, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {WindowState} from "../../model/windowState.model";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  authenticationSubscription: Subscription;
  authenticated: boolean;

  constructor(private windowService: WindowService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticationSubscription = this.authService.authenticationChanged.subscribe(
      (response: boolean) => {
        this.authenticated = response;
      }
    );
  }

  showLogin() {
    this.windowService.changeAssetWindow(WindowState.Login);
  }
}
