import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";
import {AssetService} from "../../service/asset.service";
import {MapService} from "../../service/map.service";

@Component({
  selector: 'app-background-window',
  templateUrl: './background-window.component.html',
  styleUrls: ['./background-window.component.scss']
})
export class BackgroundWindowComponent implements OnInit, OnDestroy {
  @Input() iconSize;
  @Input() pickEvent: Observable<void>;
  assetSubscription: Subscription;
  pickSubscription: Subscription;

  backgroundAssets: Asset[];

  constructor(private assetService: AssetService,
              private mapService: MapService) {}

  ngOnInit(): void {
    this.pickSubscription = this.pickEvent.subscribe(() => {
      this.updateSelection();
    });
    this.assetSubscription = this.assetService.backgroundAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.backgroundAssets = response;
      }
    );
    this.assetService.getBackgroundAssetsFromServer();
  }

  ngOnDestroy(): void {
    this.pickSubscription.unsubscribe();
    this.assetSubscription.unsubscribe();
  }

  toggleSelect(background: Asset) {
    this.backgroundAssets.forEach((asset: Asset) => {
        if (asset.selected) asset.selected = false;
    });
    background.selected = !background.selected;
  }

  updateSelection() {
    this.mapService.changeBackgroundImage(
      this.backgroundAssets.find((asset: Asset) => asset.selected));
  }
}
