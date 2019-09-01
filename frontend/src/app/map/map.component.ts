import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../service/websocket.service";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvasDiv', {static: false})
  canvasDiv: ElementRef;

  // Map settings
  mapImageSource = "assets/dev/River Crossing 22x30.png";
  backgroundWidth = 1540;
  backgroundHeight = 2100;

  // Grid settings
  lineColour = "black";
  lineWidth = 1;

  gridWidth = 22;
  gridHeight = 30;

  tokenWidth = this.backgroundWidth / this.gridWidth;
  tokenHeight = this.backgroundHeight / this.gridHeight;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.tokenService.moveToken("TestToken",
      Math.random() * 200 + 100,
      Math.random() * 200 + 100);
  }

  private ngAfterViewInit(): void {
    this.updateScreenSize();
  }

  public updateBackground(imageSource: string, width: number, height: number):void {
    this.mapImageSource = imageSource;
    this.backgroundWidth = width;
    this.backgroundHeight = height;
  }

  public updateGrid(width: number, height: number): void {
    this.gridWidth = width;
    this.gridHeight = height;
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    // TODO: Debounce the change by a bit
    this.updateScreenSize();
  }

  private updateScreenSize(): void {
    (<HTMLDivElement>this.canvasDiv.nativeElement).style.height = (window.innerHeight - 100).toString() + "px";
  }
}
