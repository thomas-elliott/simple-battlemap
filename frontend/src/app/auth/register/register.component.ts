import {Component, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {AuthService} from "../../service/auth.service";
import {WindowState} from "../../model/windowState.model";
import {RegistrationRequest} from "../../model/registrationRequest.model";

@Component({
  selector: 'window-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regData: RegistrationRequest = new RegistrationRequest();

  showError = false;

  constructor(private windowService: WindowService,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.regData);
  }

  registerDisabled() : boolean {
    return (this.regData.name == null ||
      this.regData.username == null ||
      this.regData.password == null);
  }

  register() {
    if (!this.registerDisabled()) {
      this.authService.registerAccount(this.regData);
    }
  }

  login() {
    this.windowService.changeWindow(WindowState.Login);
  }

  closeWindow() {
    this.windowService.changeWindow(WindowState.None);
  }

}
