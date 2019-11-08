import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {TokenService} from "../service/token.service";
import {AssetService} from "../service/asset.service";
import {Subscription} from "rxjs";
import {Asset} from "../model/asset.model";
import {Token} from "../model/token.model";
import {TokenCanvasComponent} from "./token-canvas/token-canvas.component";
import {AuthService} from "../service/auth.service";
import {MapService} from "../service/map.service";
import {BattleMap} from "../model/battleMap.model";
import {WebsocketService} from "../service/websocket.service";
import {DragInfo} from "../model/dragInfo.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  tokenSelectedSubscription: Subscription;
  mapSubscription: Subscription;
  authSubscription: Subscription;

  selectedTokenAsset: Asset;
  selectedTokenId: number;
  dragInfo: DragInfo = new DragInfo();

  emptyMap = true;

  @Input()
  isDm: boolean;

  @ViewChild('canvasDiv', {static: false})
  canvasDiv: ElementRef;

  @ViewChild('tokenCanvas', {static: false})
  tokenCanvas: TokenCanvasComponent;

  // Map settings
  mapImageId: number;
  backgroundWidth = 1600;
  backgroundHeight = 1600;

  // Grid settings
  lineColour = "black";
  lineWidth = 1;

  gridWidth: number;
  gridHeight: number;

  constructor(private assetService: AssetService,
              private tokenService: TokenService,
              private mapService: MapService,
              private wsService: WebsocketService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.mapSubscription = this.mapService.mapChanged.subscribe(
      (response: BattleMap) => {
        if (response !== null) {
          this.emptyMap = false;
          this.mapChanged(response);
        } else {
          this.emptyMap = true;
        }
        this.tokenService.getTokensFromServer();
    });

    this.tokenSelectedSubscription = this.assetService.selectedTokenChanged.subscribe(
      (response: Asset) => {
        this.selectedTokenAsset = response;
    });
    this.authSubscription = this.authService.authenticationChanged.subscribe(
      () => {
        // Refresh everything if the auth level changed
        this.tokenService.getTokensFromServer();
    });
  }

  ngOnDestroy(): void {
    this.tokenSelectedSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  private mapChanged(map: BattleMap): void {
    console.log(`Map component, id changed to ${map.id}`);
    this.gridHeight = map.gridHeight;
    this.gridWidth = map.gridWidth;
    this.lineWidth = map.gridLineWidth;
    this.mapImageId = map.backgroundId;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (this.emptyMap) return;

    const rect = (<HTMLDivElement>this.canvasDiv.nativeElement).getBoundingClientRect();

    const mouseX = event.pageX - rect.left;
    const mouseY = event.pageY - rect.top;
    console.log (`Click down on ${mouseX}, ${mouseY}`);
    this.dragInfo.isDragging = false;

    if (this.selectedTokenAsset) {
      this.tokenService.addToken(
        new Token('Test token',
          this.selectedTokenAsset.id, 0, mouseX, mouseY)
      );
    }

    const selectedTokenId = this.tokenCanvas.getTokenAtPoint(mouseX, mouseY);
    console.log (`Selected token ${selectedTokenId}`);
    if (selectedTokenId !== null) {
      if (this.selectedTokenId === selectedTokenId) {
        // Start dragging TODO: change mouse pointer
        this.dragInfo.isDragging = true;
        this.dragInfo.originalClickX = mouseX;
        this.dragInfo.originalClickY = mouseY;
      } else {
        this.selectedTokenId = selectedTokenId;
        this.tokenCanvas.setSelectedToken(selectedTokenId);
      }
    } else {
      if (this.selectedTokenId != null) {
        this.selectedTokenId = null;
        this.tokenCanvas.setSelectedToken(null);
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    if (this.emptyMap) return;
    // For now don't let players move tokens
    if (!this.isDm) return;
    if (!this.dragInfo.isDragging) return;

    if (this.selectedTokenId == null) {
      this.dragInfo.isDragging = false;
      return;
    }

    const rect = (<HTMLDivElement>this.canvasDiv.nativeElement).getBoundingClientRect();

    const mouseX = event.pageX - rect.left;
    const mouseY = event.pageY - rect.top;
    console.log(`Finished dragging at ${mouseX},${mouseY}`);
    this.dragInfo.isDragging = false;

    // Move selected token to X, Y
    this.tokenCanvas.moveToken(this.selectedTokenId, mouseX, mouseY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    if (!this.dragInfo.isDragging) return;

    // TODO: Does this need to be set every update?
    const rect = (<HTMLDivElement>this.canvasDiv.nativeElement).getBoundingClientRect();
    this.dragInfo.mouseX = event.pageX - rect.left;
    this.dragInfo.mouseY = event.pageY - rect.top;
  }

  private ngAfterViewInit(): void {
    this.updateScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    // TODO: Debounce the change by a bit
    this.updateScreenSize();
  }

  private updateScreenSize(): void {
    (<HTMLDivElement>this.canvasDiv.nativeElement).style.height = (window.innerHeight - 80).toString() + "px";
  }
}
