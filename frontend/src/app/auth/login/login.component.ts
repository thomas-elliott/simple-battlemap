import {Component, OnInit} from '@angular/core';
import {WindowState} from "../../model/windowState.model";
import {WindowService} from "../../service/window.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'window-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  showError = false;

  constructor(private windowService: WindowService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginDisabled(): boolean {
    return (this.username == null || this.password == null);
  }

  closeWindow(): void {
    this.windowService.changeWindow(WindowState.None);
  }

  register(): void {

  }

  login() {
    this.showError = false;

    this.authService.sendLogin(this.username, this.password).then(
      (resolve) => {
        this.windowService.changeWindow(WindowState.None);
      },
      (reject) => {
        this.showError = true;
      }
    );
  }
}
