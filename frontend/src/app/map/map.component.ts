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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  tokenSelectedSubscription: Subscription;
  authSubscription: Subscription;
  selectedTokenAsset: Asset;
  selectedTokenId: number;
  isDragging: boolean;

  @Input()
  isDm: boolean;

  @ViewChild('canvasDiv', {static: false})
  canvasDiv: ElementRef;

  @ViewChild('tokenCanvas', {static: false})
  tokenCanvas: TokenCanvasComponent;

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

  constructor(private assetService: AssetService,
              private tokenService: TokenService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
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

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    const rect = (<HTMLDivElement>this.canvasDiv.nativeElement).getBoundingClientRect();

    const mouseX = event.pageX - rect.left;
    const mouseY = event.pageY - rect.top;
    console.log (`Click down on ${mouseX}, ${mouseY}`);
    this.isDragging = false;

    if (this.selectedTokenAsset) {
      this.tokenService.addToken(
        new Token('Test token',
          this.selectedTokenAsset.id, 0,
          mouseX, mouseY)
      );
    }

    const selectedTokenId = this.tokenCanvas.getTokenAtPoint(mouseX, mouseY);
    console.log (`Selected token ${selectedTokenId}`);
    if (selectedTokenId !== null) {
      if (this.selectedTokenId === selectedTokenId) {
        // Start dragging TODO: change mouse pointer
        this.isDragging = true;
        console.log('Start dragging');
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
    // For now don't let players move tokens
    if (!this.isDm) return;
    if (!this.isDragging) return;

    if (this.selectedTokenId == null) {
      this.isDragging = false;
      return;
    }

    const rect = (<HTMLDivElement>this.canvasDiv.nativeElement).getBoundingClientRect();

    const mouseX = event.pageX - rect.left;
    const mouseY = event.pageY - rect.top;
    console.log(`Finished dragging at ${mouseX},${mouseY}`);

    // Move selected token to X, Y
    this.tokenCanvas.moveToken(this.selectedTokenId, mouseX, mouseY);
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
