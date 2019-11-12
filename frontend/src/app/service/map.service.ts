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
      this.getMapIdFromServer();
    });
  }

  public mapLoaded(): boolean {
    return this.map !== null;
  }

  public notifyMapChanged() {
    console.log(`Map changed. Map is:`);
    console.log(this.map);
    this.mapChanged.next(this.map);
  }

  public notifyMapListChanged() {
    this.mapListChanged.next(this.mapList.slice());
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

  public getMapListFromServer() {
    console.log('Getting map list');
    this.httpClient.get(`${this.serverPath}/data/battleMaps`).subscribe(
      (response: MapListResponse) => {
        this.mapList = response._embedded.battleMaps;
        this.notifyMapListChanged();
      }, () => {
        console.error('Error getting map list');
      }
    );
  }

  public getMapIdFromServer() {
    console.log('load map info');
    this.httpClient.get(`${this.serverPath}/map/info`).subscribe(
      (response: MapInfo) => {
        this.mapId = response.mapId;
        if (this.mapId) {
          this.getMapFromServer(response.mapId);
        }
        console.log(`Loaded map information ${response.mapId}`);
      }, () => {
        console.error('Error getting map info');
      }
    );
  }

  private getMapFromServer(id: number) {
    console.log(`loading map ${id} from server`);
    return this.httpClient.get(`${this.serverPath}/data/battleMaps/${id}`).subscribe(
      (response: BattleMap) => {
        this.map = response;
        console.log(`Loaded map ${response.id}`);
        this.notifyMapChanged();
    });
  }

  public saveMap(): void {
    console.log('save map');
    this.httpClient.post(`${this.serverPath}/map/save`, {})
      .subscribe(() => {
        console.log('Finished saving map');
      }, () => {
        console.error('Error saving map');
    });
  }

  public loadMap(id: number): void {
    console.log('load map');
    this.httpClient.post(`${this.serverPath}/map/load/${id}`, {})
      .subscribe(() => {
        console.log('Finished loading map');
      }, () => {
        console.error('Error loading map');
    });
  }

  public newMap(assetId: number): void {
    console.log('new map');
    this.httpClient.post(`${this.serverPath}/map/new/${assetId}`, {})
      .subscribe(() => {
        console.log('Finished setting new map');
      }, () => {
        console.error('Error setting new map');
    });
  }

  public saveMapSettings(map: BattleMap): void {
    this.httpClient.put(`${this.serverPath}/map/update`,
      map).subscribe(() => {
       console.log('Map settings updated');
    }, () => {
        console.error('Error saving map settings');
    });
  }

  public deleteMap(id: number): void {
    console.log('delete map');
    this.httpClient.delete(`${this.serverPath}/map/delete/${id}`)
      .subscribe(() => {
        console.log('Finished deleting map');
      }, () => {
        console.error('Error deleting map');
    });
  }
}
