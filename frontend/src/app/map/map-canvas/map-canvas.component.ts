import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MapService} from "../../service/map.service";
import {Subscription} from "rxjs";
import {BattleMap} from "../../model/map.model";

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss']
})
export class MapCanvasComponent implements OnInit, OnDestroy {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

  currentMap: BattleMap;

  @ViewChild('mapCanvas', {static: false})
  mapCanvas: ElementRef;

  public mapContext: CanvasRenderingContext2D;

  private mapSubscription: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    console.log('Subscribing to map change');
    this.mapSubscription = this.mapService.mapChanged.subscribe(
    (response: BattleMap) => {
      if (response != null) {
        console.log(`Map changed to ${response.id}`);
        if (this.currentMap == null || this.currentMap.id != response.id) {
          this.currentMap = response;
          this.mapChanged();
        } else {
          this.currentMap = response;
        }
      }
    });

    this.mapService.getMapIdFromServer();
  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
  }

  private mapChanged(): void {
    console.log('Map changed in canvas');
    this.drawMap(`${this.serverPath}/image/${this.currentMap.backgroundId}/image.png`);
  }

  private ngAfterViewInit(): void {
    this.mapContext = (<HTMLCanvasElement>this.mapCanvas.nativeElement).getContext('2d');

    if (this.currentMap != null) {
      this.drawMap(`${this.serverPath}/image/${this.currentMap.backgroundId}/image.png`);
    }
  }

  private drawMap(src: string) {
    console.log(`Drawing background from ${src}`);
    let background = new Image();
    background.src = src;

    let ctx = this.mapContext;
    background.onload = () => {
      this.mapContext.canvas.width = background.width;
      this.mapContext.canvas.height = background.height;

      ctx.drawImage(background, 0, 0);
    };
  }
}
