import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {WindowService} from "./service/window.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple Battlemap';

  assetWindowSubscription: Subscription;

  showPage: string;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.assetWindowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    )
  }
}
