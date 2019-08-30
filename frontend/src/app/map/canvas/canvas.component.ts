import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('mapCanvas', {static: false})
  mapCanvas: ElementRef;
  @ViewChild('gridCanvas', {static: false})
  gridCanvas: ElementRef;
  @ViewChild('canvasDiv', {static: false})
  canvasDiv: ElementRef;

  public gridContext: CanvasRenderingContext2D;
  public mapContext: CanvasRenderingContext2D;

  // Grid settings
  lineColour = "black";
  lineWidth = 1;

  gridWidth = 22;
  gridHeight = 30;

  constructor() { }

  ngOnInit() {
  }

  private ngAfterViewInit(): void {
    this.gridContext = (<HTMLCanvasElement>this.gridCanvas.nativeElement).getContext('2d');
    this.mapContext = (<HTMLCanvasElement>this.mapCanvas.nativeElement).getContext('2d');

    this.updateScreenSize();
    this.drawMap("assets/River Crossing 22x30.png");
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    // TODO: Debounce the change by a bit
    this.updateScreenSize();
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  private updateScreenSize(): void {
    (<HTMLDivElement>this.canvasDiv.nativeElement).style.height = (window.innerHeight - 100).toString() + "px";
  }

  private drawMap(src: string) {
    var background = new Image();
    background.src = src;

    var ctx = this.mapContext;
    background.onload = () => {
      console.log("background: " + background.width + "x" + background.height);

      this.gridContext.canvas.width = background.width;
      this.gridContext.canvas.height = background.height;
      this.mapContext.canvas.width = background.width;
      this.mapContext.canvas.height = background.height;

      ctx.drawImage(background, 0, 0);
    };
  }

  private drawGrid(width, height) {
    const padding = 0;

    const canvasHeight = this.gridContext.canvas.height - padding * 1.2;
    const canvasWidth = this.gridContext.canvas.width - padding * 1.2;
    const gridHeight = canvasHeight / height;
    const gridWidth = canvasWidth / width;

    for (var x = 0; x < this.gridContext.canvas.width; x += gridWidth) {
      this.gridContext.moveTo(x + padding, padding);
      this.gridContext.lineTo(x + padding, this.gridContext.canvas.height + padding);
    }

    for (var y = 0; y < this.gridContext.canvas.height; y += gridHeight) {
      this.gridContext.moveTo(padding, y + padding);
      this.gridContext.lineTo(this.gridContext.canvas.width + padding, y + padding);
    }

    this.gridContext.strokeStyle = this.lineColour;
    this.gridContext.lineWidth = this.lineWidth;
    this.gridContext.stroke();
  }
}
