import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Token} from "../../model/token.model";
import {TokenService} from "../../service/token.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-token-canvas',
  templateUrl: './token-canvas.component.html',
  styleUrls: ['./token-canvas.component.scss']
})
export class TokenCanvasComponent implements OnInit {
  @ViewChild('tokenCanvas', {static: false})
  tokenCanvas: ElementRef;

  tokenSubscription: Subscription;

  @Input() backgroundWidth: number;
  @Input() backgroundHeight: number;

  @Input() tokenWidth: number;
  @Input() tokenHeight: number;

  tokens = [];

  public tokenContext: CanvasRenderingContext2D;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenSubscription = this.tokenService.tokenChanged.subscribe(
      (response) => {
        this.tokens = response;
        this.drawTokens();
      }
    );
  }

  private ngAfterViewInit(): void {
    this.tokenContext = (<HTMLCanvasElement>this.tokenCanvas.nativeElement).getContext('2d');
    // Canvas size from background
    this.setCanvasSize(this.backgroundWidth, this.backgroundHeight);
    // Token size from canvas size / grid
    this.addToken("TestToken", "assets/dev/1.png", 70, 70, this.tokenWidth, this.tokenHeight);
    this.moveToken("TestToken", 150, 150);
//    this.removeToken(1);
  }

  // Add Token
  public addToken(name: string, image: string, x: number, y: number, width: number, height: number) {
    this.tokenService.addToken(name, image, x, y, width, height);
  }

  // Remove Token
  public removeToken(name: string) {
    this.tokenService.removeToken(name);
  }

  // Move Token
  public moveToken(name: string, x: number, y: number) {
    this.tokenService.moveToken(name, x, y);
  }

  private setCanvasSize(width: number, height: number) {
    this.tokenContext.canvas.width = width;
    this.tokenContext.canvas.height = height;
  }

  private drawTokens() {
    // TODO: Debounce updating the canvas
    console.log("Drawing tokens");

    for (let token of this.tokens) {
      var background = new Image();
      background.src = token.imageSource;

      var ctx = this.tokenContext;
      background.onload = () => {
        ctx.drawImage(background, token.x, token.y, token.width, token.height);
      };
    }
  }
}
