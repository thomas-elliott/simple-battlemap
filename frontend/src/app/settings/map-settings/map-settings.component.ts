import { Component, OnInit } from '@angular/core';
import {BattleMap} from "../../model/battleMap.model";
import {MapService} from "../../service/map.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'window-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {
  private mapSubscription: Subscription;

  map: BattleMap;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapSubscription = this.mapService.mapChanged.subscribe(
      (response: BattleMap) => {
        this.map = response;
    });
    this.map = this.mapService.map;
  }

  clickSave() {
    this.mapService.saveMapSettings(this.map);
  }
}
