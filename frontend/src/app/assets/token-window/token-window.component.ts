import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AssetService} from "../../service/asset.service";
import {Observable, Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";

@Component({
  selector: 'app-token-window',
  templateUrl: './token-window.component.html',
  styleUrls: ['./token-window.component.scss']
})
export class TokenWindowComponent implements OnInit, OnDestroy {
  @Input() iconSize;
  @Input() pickEvent: Observable<void>;
  assetSubscription: Subscription;
  pickSubscription: Subscription;

  tokenAssets: Asset[];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.pickSubscription = this.pickEvent.subscribe(() => {
      this.updateSelection();
    });
    this.assetSubscription = this.assetService.tokenAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.tokenAssets = response;
      }
    );
    this.assetService.getTokenAssetsFromServer();
  }

  ngOnDestroy(): void {
    this.pickSubscription.unsubscribe();
    this.assetSubscription.unsubscribe();
  }

  toggleSelect(asset: Asset) {
    asset.selected = !asset.selected;
  }

  updateSelection() {
    this.assetService.selectTokenAssets(
      this.tokenAssets.filter((asset: Asset) => asset.selected));
  }

  deleteAsset() {
    console.log('Deleting assets');
    this.assetService.deleteTokenAssets(
      this.tokenAssets.filter((asset: Asset) => asset.selected));
  }
}
