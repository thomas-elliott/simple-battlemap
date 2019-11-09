import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../service/map.service";
import {Subscription} from "rxjs";
import {BattleMap} from "../../model/battleMap.model";
import {WindowService} from "../../service/window.service";
import {WindowState} from "../../model/windowState.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'window-map-load',
  templateUrl: './map-load.component.html',
  styleUrls: ['./map-load.component.scss']
})
export class MapLoadComponent implements OnInit, OnDestroy {
  mapListSubscription: Subscription;

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;
  mapList: BattleMap[];

  constructor(private mapService: MapService,
              private windowService: WindowService) { }

  ngOnInit() {
    this.mapListSubscription = this.mapService.mapListChanged.subscribe(
      (response: BattleMap[]) => {
        console.log('Map list updated in component');
        this.mapList = response;
      }
    );
    this.mapService.getMapListFromServer();
  }

  ngOnDestroy(): void {
    this.mapListSubscription.unsubscribe();
  }

  loadMap(id: number): void {
    this.mapService.loadMap(id);
    this.windowService.changeWindow(WindowState.None);
  }

  deleteMap(id: number) {
    this.mapService.deleteMap(id);
    this.windowService.changeWindow(WindowState.None);
  }
}
