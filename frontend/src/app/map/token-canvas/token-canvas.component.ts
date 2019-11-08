import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {Subscription} from "rxjs";
import {WebsocketService} from "../../service/websocket.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-token-canvas',
  templateUrl: './token-canvas.component.html',
  styleUrls: ['./token-canvas.component.scss']
})
export class TokenCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('tokenCanvas', {static: false})
  tokenCanvas: ElementRef;

  tokenSubscription: Subscription;
  tokenWsSubscription: Subscription;

  @Input() backgroundWidth: number;
  @Input() backgroundHeight: number;

  @Input() gridWidth: number;
  @Input() gridHeight: number;

  tokens = [];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  public tokenContext: CanvasRenderingContext2D;

  constructor(private tokenService: TokenService,
              private wsService: WebsocketService) { }

  tokenWidth(): number {
    return this.backgroundWidth / this.gridWidth
  }

  tokenHeight(): number {
    return this.backgroundHeight / this.gridHeight;
  }

  ngOnInit(): void {
    this.tokenSubscription = this.tokenService.tokenChanged.subscribe(
      (response) => {
        this.tokens = response;
        this.drawTokens();
      }
    );

    this.tokenWsSubscription = this.wsService.tokenSubject.subscribe(
      () => {
        // Incoming WS message, update tokens
        this.tokenService.getTokensFromServer();
      }
    )
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
    this.tokenWsSubscription.unsubscribe();
  }

  private ngAfterViewInit(): void {
    this.tokenContext = (<HTMLCanvasElement>this.tokenCanvas.nativeElement).getContext('2d');
    this.setCanvasSize(this.backgroundWidth, this.backgroundHeight);
  }

  // Move Token
  public moveToken(tokenId: number, x: number, y: number) {
    if ((x - this.tokenWidth() / 2) > 0) {
      x = x - this.tokenWidth() / 2;
    }
    if ((y - this.tokenHeight() / 2) > 0) {
      y = y - this.tokenHeight() / 2;
    }

    this.tokenService.moveToken(tokenId, x, y);
  }

  public setSelectedToken(selectedTokenId: number): void {
    this.tokenService.selectedTokenId = selectedTokenId;
    this.drawTokens();
  }

  public getTokenAtPoint(x: number, y: number): number {

    for (let token of this.tokens) {
      if (x > token.x &&
          x < token.x + this.tokenWidth() &&
          y > token.y &&
          y < token.y + this.tokenWidth()) {
          return token.id;
      }
    }
    return null;
  }

  private setCanvasSize(width: number, height: number) {
    this.tokenContext.canvas.width = width;
    this.tokenContext.canvas.height = height;
  }

  private drawTokens() {
    // TODO: Debounce updating the canvas
    console.log(`Drawing ${this.tokens.length} tokens. Background: ${this.backgroundWidth}x${this.backgroundHeight},
       grid: ${this.gridWidth}x${this.gridHeight}, token: ${this.tokenWidth().toString()}x${this.tokenHeight().toString()}`);
    this.tokenContext.clearRect(0,0, this.backgroundWidth, this.backgroundHeight);

    for (let token of this.tokens) {
      let background = new Image();

      let ctx = this.tokenContext;
      //ctx.clearRect(token.x - 5, token.y - 5, this.tokenWidth + 10, this.tokenHeight + 10);

      if (this.tokenService.selectedTokenId === token.id) {
        console.log(`Drawing selection box ${token.id}`);
        ctx.beginPath();
        ctx.rect(token.x, token.y, this.tokenWidth(), this.tokenHeight());
        ctx.strokeStyle = "rgb(110,153,174)";
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      background.onload = () => {
        ctx.drawImage(background, token.x, token.y, this.tokenWidth(), this.tokenHeight());
      };

      background.src = `${this.serverPath}image/${token.assetId}/thumbnail.png`;
    }
  }
}
