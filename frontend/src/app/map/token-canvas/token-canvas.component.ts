import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {interval, Subscription} from "rxjs";
import {WebsocketService} from "../../service/websocket.service";
import {environment} from "../../../environments/environment";
import {DragInfo} from "../../model/dragInfo.model";

@Component({
  selector: 'app-token-canvas',
  templateUrl: './token-canvas.component.html',
  styleUrls: ['./token-canvas.component.scss']
})
export class TokenCanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tokenCanvas')
  tokenCanvas: ElementRef;
  @ViewChild('markupCanvas')
  markupCanvas: ElementRef;

  tokenSubscription: Subscription;
  tokenWsSubscription: Subscription;
  timerSubscription: Subscription;

  @Input() backgroundWidth: number;
  @Input() backgroundHeight: number;

  @Input() gridWidth: number;
  @Input() gridHeight: number;

  @Input() dragInfo: DragInfo;

  tokens = [];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  public tokenContext: CanvasRenderingContext2D;
  public markupContext: CanvasRenderingContext2D;

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
        this.drawSelectionBox();
      }
    );

    this.tokenWsSubscription = this.wsService.tokenSubject.subscribe(
      () => {
        // Incoming WS message, update tokens
        this.tokenService.getTokensFromServer();
      }
    );

    this.timerSubscription = interval(100).subscribe(() => {
      if (this.dragInfo && this.dragInfo.isDragging) {
        this.updateDrag();
      }
    });
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
    this.tokenWsSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tokenContext = (<HTMLCanvasElement>this.tokenCanvas.nativeElement).getContext('2d');
    this.markupContext = (<HTMLCanvasElement>this.markupCanvas.nativeElement).getContext('2d');
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
    this.drawSelectionBox();
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
    this.markupContext.canvas.width = width;
    this.markupContext.canvas.height = height;
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

      background.onload = () => {
        ctx.drawImage(background, token.x, token.y, this.tokenWidth(), this.tokenHeight());
      };

      background.src = `${this.serverPath}image/${token.assetId}/thumbnail.png`;
    }
  }

  private drawSelectionBox() {
    this.markupContext.clearRect(0,0, this.backgroundWidth, this.backgroundHeight);
    let ctx = this.markupContext;

    let token = this.tokens.find(token => this.tokenService.selectedTokenId === token.id);

    if (token) {
      ctx.beginPath();
      ctx.rect(token.x, token.y, this.tokenWidth(), this.tokenHeight());
      ctx.strokeStyle = "rgb(110,153,174)";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }

  private updateDrag() {
    this.drawSelectionBox();

    let ctx = this.markupContext;

    ctx.beginPath();
    ctx.moveTo(this.dragInfo.originalClickX, this.dragInfo.originalClickY);
    ctx.lineTo(this.dragInfo.mouseX, this.dragInfo.mouseY);
    ctx.strokeStyle = "rgb(110,153,174)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.dragInfo.mouseX, this.dragInfo.mouseY, this.tokenWidth() / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}
