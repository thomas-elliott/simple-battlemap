import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {AssetsResponse} from "../model/assetsResponse.model";
import {Asset} from "../model/asset.model";

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  tokenAssetsChanged = new Subject<Asset[]>();
  tokenAssets: Asset[];

  serverPath = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  notifyTokenAssetChanged() {
    console.log("notify asset changed");
    return this.tokenAssetsChanged.next(this.tokenAssets.slice());
  }

  public getTokenAssetsFromServer(): void {
    // http://localhost:8080/data/assets/search/findAllByType?type=TOKEN
    this.httpClient.get(this.serverPath + 'data/assets/search/findAllByType?type=TOKEN')
      .subscribe(
        (response: AssetsResponse) => {
          this.tokenAssets = response._embedded.assets;
          this.notifyTokenAssetChanged();
        },
        (error: HttpErrorResponse) => {
          console.error("Error: " + error);
        }
      );
  }
}
