import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-token-canvas',
  templateUrl: './token-canvas.component.html',
  styleUrls: ['./token-canvas.component.scss']
})
export class TokenCanvasComponent implements OnInit {
  @ViewChild('tokenCanvas', {static: false})
  tokenCanvas: ElementRef;

  public tokenContext: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  private ngAfterViewInit(): void {
    this.tokenContext = (<HTMLCanvasElement>this.tokenCanvas.nativeElement).getContext('2d');
  }
}
