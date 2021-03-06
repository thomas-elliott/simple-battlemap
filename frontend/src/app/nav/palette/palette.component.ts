import {Component, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {AssetService} from "../../service/asset.service";
import {Subscription} from "rxjs";
import {WindowState} from "../../model/windowState.model";
import {Asset} from "../../model/asset.model";
import {TokenService} from "../../service/token.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit, OnDestroy {
  assetSubscription: Subscription;
  selectedTokenAssets: Asset[];
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  constructor(private windowService: WindowService,
              private assetService: AssetService,
              private tokenService: TokenService) {}

  ngOnInit(): void {
    this.assetSubscription = this.assetService.selectedTokenAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.selectedTokenAssets = response;
      }
    );
  }

  ngOnDestroy(): void {
    this.assetSubscription.unsubscribe();
  }

  showNone(): void {
    this.windowService.changeWindow(WindowState.None);
  }

  showToken(): void {
    this.windowService.changeWindow(WindowState.AssetToken);
  }

  showBackground(): void {
    this.windowService.changeWindow(WindowState.AssetBackground);
  }

  selectToken(asset: Asset): void {
    this.assetService.selectToken(asset);
  }

  refreshTokens():void {
    this.tokenService.getTokensFromServer();
  }

  deleteToken() {
    this.tokenService.removeToken();
  }
}
