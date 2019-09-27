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
  backgroundAssetsChanged = new Subject<Asset[]>();
  backgroundAssets: Asset[];
  tokenAssetsChanged = new Subject<Asset[]>();
  tokenAssets: Asset[];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

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

  public selectTokenAssets(assets: Asset[]): void {
    this.selectedTokenAssets = assets;
    this.notifySelectedTokenAssetsChanged();
  }

  public selectToken(asset: Asset): void {
    this.selectedToken = asset;
    this.notifySelectedTokenChanged();
  }

  public getTokenAssetsFromServer(): void {
    this.httpClient.get(`${this.serverPath}/data/assets/search/findAllByType?type=TOKEN`)
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
    this.httpClient.get(`${this.serverPath}/data/assets/search/findAllByType?type=BACKGROUND`)
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

  deleteTokenAssets(assets: Asset[]) {
    for (let token of assets) {
      console.log(`Deleting token assets ${token.id}`);
      this.httpClient.delete(`${this.serverPath}/asset/${token.id}`).subscribe(
        () => {
          this.getTokenAssetsFromServer();
        });
    }
  }
}
