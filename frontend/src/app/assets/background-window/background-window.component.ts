import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";
import {AssetService} from "../../service/asset.service";

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

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.pickSubscription = this.pickEvent.subscribe(() => {
      //this.updateSelection();
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
    background.selected = !background.selected;
  }

  updateSelection() {
    this.assetService.selectBackgroundAssets(
      this.backgroundAssets.filter((asset: Asset) => asset.selected));
  }
}
