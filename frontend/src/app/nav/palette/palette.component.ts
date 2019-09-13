import {Component, OnInit} from '@angular/core';
import {WindowService} from "../../service/window.service";
import {AssetService} from "../../service/asset.service";
import {Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
  assetSubscription: Subscription;
  selectedTokenAssets: Asset[];

  constructor(private windowService: WindowService,
              private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetSubscription = this.assetService.selectedTokenAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.selectedTokenAssets = response;
      }
    );
  }

  showAssets(assetType: string) {
    this.windowService.changeAssetWindow(assetType);
  }

  selectToken(asset: Asset) {
    this.assetService.selectToken(asset);
  }
}
