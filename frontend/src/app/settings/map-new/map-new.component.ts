import {environment} from "../../../environments/environment";
import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";
import {AssetService} from "../../service/asset.service";
import {MapService} from "../../service/map.service";

@Component({
  selector: 'window-map-new',
  templateUrl: './map-new.component.html',
  styleUrls: ['./map-new.component.scss']
})
export class MapNewComponent implements OnInit {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  assetSubscription: Subscription;

  backgroundAssets: Asset[];

  constructor(private assetService: AssetService,
              private mapService: MapService) {}

  ngOnInit(): void {
    this.assetSubscription = this.assetService.backgroundAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.backgroundAssets = response;
      }
    );
    this.assetService.getBackgroundAssetsFromServer();
  }

  ngOnDestroy(): void {
    this.assetSubscription.unsubscribe();
  }

  pickMap(assetId: number) {
    this.mapService.newMap(assetId);
  }
}
