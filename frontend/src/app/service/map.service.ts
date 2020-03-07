import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MapInfo} from "../model/mapInfo.model";
import {Subject} from "rxjs";
import {BattleMap} from "../model/battleMap.model";
import {Asset} from "../model/asset.model";
import {MapListResponse} from "../model/mapListResponse.model";
import {WebsocketService} from "./websocket.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

  mapListChanged = new Subject<BattleMap[]>();
  mapChanged = new Subject<BattleMap>();

  // Current map
  map: BattleMap;
  mapId: number;

  // Optional maps to load
  mapList: BattleMap[];

  constructor(private httpClient: HttpClient,
              private wsService: WebsocketService) {
    this.wsService.mapSubject.subscribe(() => {
      this.getMapFromServer();
    });
  }

  public mapLoaded(): boolean {
    return this.map !== null;
  }

  public notifyMapChanged() {
    console.debug('Map changed. Map is: ', this.map);
    this.mapChanged.next(this.map);
  }

  public notifyMapListChanged() {
    this.mapListChanged.next(this.mapList.slice());
  }

  public checkMapUpdate(mapId: number) {
    if (mapId != null && this.mapId !== mapId) {
      this.getMapFromServer();
    }
  }


  public changeBackgroundImage(asset: Asset) {
    if (asset == null) return;
    console.debug(`changing background image to ${asset.id}`);
    this.httpClient.put(`${this.serverPath}/map/image/${asset.id}`,
      {}).subscribe(
      () => {
        console.debug('Change image response');
        this.notifyMapChanged();
      },
      () => {
        console.error('Change image error');
      }
    )
  }

  public getMapListFromServer() {
    console.debug('Getting map list');
    this.httpClient.get(`${this.serverPath}/map/`).subscribe(
      (response: MapListResponse) => {
        this.mapList = response.content;
        this.notifyMapListChanged();
      }, () => {
        console.error('Error getting map list');
      }
    );
  }

  private getMapFromServer() {
    console.debug(`loading map from server`);
    return this.httpClient.get(`${this.serverPath}/map/info`).subscribe(
      (response: BattleMap) => {
        this.map = response;
        this.mapId = response.id;
        console.debug(`Loaded map ${response.id}`);
        this.notifyMapChanged();
    });
  }

  public saveMap(): void {
    console.debug('save map');
    this.httpClient.post(`${this.serverPath}/map/save`, {})
      .subscribe(() => {
        console.debug('Finished saving map');
      }, () => {
        console.error('Error saving map');
    });
  }

  public loadMap(id: number): void {
    console.debug('load map');
    this.httpClient.post(`${this.serverPath}/map/load/${id}`, {})
      .subscribe(() => {
        console.debug('Finished loading map');
      }, () => {
        console.error('Error loading map');
    });
  }

  public newMap(assetId: number): void {
    console.debug('new map');
    this.httpClient.post(`${this.serverPath}/map/new/${assetId}`, {})
      .subscribe(() => {
        console.debug('Finished setting new map');
      }, () => {
        console.error('Error setting new map');
    });
  }

  public saveMapSettings(map: BattleMap): void {
    this.httpClient.put(`${this.serverPath}/map/update`,
      map).subscribe(() => {
       console.debug('Map settings updated');
    }, () => {
        console.error('Error saving map settings');
    });
  }

  public deleteMap(id: number): void {
    console.debug('delete map');
    this.httpClient.delete(`${this.serverPath}/map/delete/${id}`)
      .subscribe(() => {
        console.debug('Finished deleting map');
      }, () => {
        console.error('Error deleting map');
    });
  }
}
