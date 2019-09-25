import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MapInfo} from "../model/mapInfo.model";
import {Subject} from "rxjs";
import {BattleMap} from "../model/map.model";
import {Asset} from "../model/asset.model";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

  mapChanged = new Subject<BattleMap>();

  map: BattleMap;
  mapId: number;

  constructor(private httpClient: HttpClient) {}

  public mapLoaded(): boolean {
    return this.map !== null;
  }

  public notifyMapChanged() {
    console.log(`Map changed. Map is:`);
    console.log(this.map);
    this.mapChanged.next(this.map);
  }

  public mapIdChanged(id: number) {
    console.log(`Map ID changed: ${id}. Retrieving from server.`);
    this.getMapFromServer(id);
  }

  public changeBackgroundImage(asset: Asset) {
    if (asset == null) return;
    console.log(`changing background image to ${asset.id}`);
    this.httpClient.put(`${this.serverPath}/map/image/${asset.id}`,
      {}).subscribe(
      () => {
        console.log('Change image response');
        this.notifyMapChanged();
      },
      () => {
        console.error('Change image error');
      }
    )
  }

  public getMapIdFromServer() {
    console.log('load map info');
    this.httpClient.get(`${this.serverPath}/map/info`).subscribe(
      (response: MapInfo) => {
        if (this.mapId !== response.mapId) {
          this.mapId = response.mapId;
          this.mapIdChanged(response.mapId);
        }
        console.log(`Loaded map information ${response.mapId}`);
      }, () => {
        console.error('Error getting map info');
      }
    );
  }

  private getMapFromServer(id: number) {
    console.log('loading map from server');
    return this.httpClient.get(`${this.serverPath}/data/battleMaps/${id}`).subscribe(
      (response: BattleMap) => {
        this.map = response;
        this.notifyMapChanged();
        console.log(`Loaded map ${response.id}`);
    });
  }

  public saveMap(): void {
    console.log('save map');
    this.httpClient.post(`${this.serverPath}/map/save`, {})
      .subscribe(() => {
        console.log('Finished saving map')
      }, () => {
        console.error('Error saving map');
      }
    );
  }
}
