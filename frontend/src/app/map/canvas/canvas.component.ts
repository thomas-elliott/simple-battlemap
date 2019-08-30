import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('mapCanvas', {static: false})
  mapCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  // Grid settings
  lineColour = "black";
  lineWidth = 1;

  gridWidth = 15;
  gridHeight = 15;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.mapCanvas.nativeElement).getContext('2d');
    this.updateScreenSize();
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.updateScreenSize();
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  private updateScreenSize(): void {
    // TODO: Debounce the change by a bit
    this.context.canvas.width = window.innerWidth - 20;
    this.context.canvas.height = window.innerHeight - 100;
  }

  private drawGrid(width, height) {
    const padding = 5;

    const canvasHeight = this.context.canvas.height - padding * 1.2;
    const canvasWidth = this.context.canvas.width - padding * 1.2;
    const gridHeight = canvasHeight / height;
    const gridWidth = canvasWidth / width;

    for (var x = 0; x < this.context.canvas.width; x += gridWidth) {
      this.context.moveTo(x + padding, padding);
      this.context.lineTo(x + padding, this.context.canvas.height + padding);
    }

    for (var y = 0; y < this.context.canvas.height; y += gridHeight) {
      this.context.moveTo(padding, y + padding);
      this.context.lineTo(this.context.canvas.width + padding, y + padding);
    }

    this.context.strokeStyle = this.lineColour;
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
  }
}
