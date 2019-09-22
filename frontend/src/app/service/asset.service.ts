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
  tokenAssetsChanged = new Subject<Asset[]>();
  tokenAssets: Asset[];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  constructor(private httpClient: HttpClient) {}

  notifyTokenAssetChanged() {
    return this.tokenAssetsChanged.next(this.tokenAssets.slice());
  }

  notifySelectedTokenChanged() {
    return this.selectedTokenChanged.next(this.selectedToken);
  }

  notifySelectedTokenAssetsChanged() {
    return this.selectedTokenAssetsChanged.next(this.selectedTokenAssets.slice());
  }

  public selectTokenAssets(assets: Asset[]) {
    this.selectedTokenAssets = assets;
    this.notifySelectedTokenAssetsChanged();
  }

  public selectToken(asset: Asset) {
    this.selectedToken = asset;
    this.notifySelectedTokenChanged();
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
}
