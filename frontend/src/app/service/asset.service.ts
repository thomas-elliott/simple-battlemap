import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {AssetsResponse} from "../model/assetsResponse.model";
import {Asset} from "../model/asset.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  selectedTokenAssetsChanged = new Subject<Asset[]>();
  selectedTokenAssets: Asset[];
  selectedTokenChanged = new Subject<Asset>();
  selectedToken: Asset;
  selectedBackgroundAssetsChanged = new Subject<Asset[]>();
  selectedBackgroundAssets: Asset[];
  selectedBackgroundChanged = new Subject<Asset>();
  selectedBackground: Asset;
  backgroundAssetsChanged = new Subject<Asset[]>();
  backgroundAssets: Asset[];
  tokenAssetsChanged = new Subject<Asset[]>();
  tokenAssets: Asset[];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  constructor(private httpClient: HttpClient) {}

  notifyTokenAssetChanged() {
    return this.tokenAssetsChanged.next(this.tokenAssets.slice());
  }

  notifyBackgroundAssetsChanged() {
    return this.backgroundAssetsChanged.next(this.backgroundAssets.slice());
  }

  notifySelectedTokenChanged() {
    return this.selectedTokenChanged.next(this.selectedToken);
  }

  notifySelectedTokenAssetsChanged() {
    return this.selectedTokenAssetsChanged.next(this.selectedTokenAssets.slice());
  }

  notifySelectedBackgroundChanged() {
    return this.selectedBackgroundChanged.next(this.selectedBackground);
  }

  notifySelectedBackgroundAssetsChanged() {
    return this.selectedBackgroundAssetsChanged.next(this.selectedBackgroundAssets.slice());
  }

  public selectTokenAssets(assets: Asset[]): void {
    this.selectedTokenAssets = assets;
    this.notifySelectedTokenAssetsChanged();
  }

  public selectBackgroundAssets(assets: Asset[]): void {
    this.selectedBackgroundAssets = assets;
    this.notifySelectedBackgroundAssetsChanged();
  }

  public selectToken(asset: Asset): void {
    this.selectedToken = asset;
    this.notifySelectedTokenChanged();
  }

  public selectBackground(asset: Asset): void {
    this.selectedBackground = asset;
    this.notifySelectedBackgroundChanged();
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
          console.error("Error:");
          console.log(error);
        }
      );
  }

  public getBackgroundAssetsFromServer(): void {
    this.httpClient.get(this.serverPath + 'data/assets/search/findAllByType?type=BACKGROUND')
      .subscribe(
        (response: AssetsResponse) => {
          this.backgroundAssets = response._embedded.assets;
          this.notifyBackgroundAssetsChanged();
        },
        (error: HttpErrorResponse) => {
          console.error("Error:");
          console.log(error);
        }
      );
  }
}
