import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-grid-canvas',
  templateUrl: './grid-canvas.component.html',
  styleUrls: ['./grid-canvas.component.scss']
})
export class GridCanvasComponent implements OnInit {
  @ViewChild('gridCanvas', {static: false})
  gridCanvas: ElementRef;

  public gridContext: CanvasRenderingContext2D;

  // Grid settings
  @Input() lineColour: string;
  @Input() lineWidth: number;
  @Input() gridWidth: number;
  @Input() gridHeight: number;

  constructor() { }

  ngOnInit() {
  }

  private ngAfterViewInit(): void {
    this.gridContext = (<HTMLCanvasElement>this.gridCanvas.nativeElement).getContext('2d');
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  private drawGrid(width, height) {
    const padding = 0;

    this.gridContext.canvas.width = 1540;
    this.gridContext.canvas.height = 2100;

    const canvasHeight = this.gridContext.canvas.height - padding * 1.2;
    const canvasWidth = this.gridContext.canvas.width - padding * 1.2;
    const gridHeight = canvasHeight / height;
    const gridWidth = canvasWidth / width;

    for (let x = 0; x < this.gridContext.canvas.width; x += gridWidth) {
      this.gridContext.moveTo(x + padding, padding);
      this.gridContext.lineTo(x + padding, this.gridContext.canvas.height + padding);
    }

    for (let y = 0; y < this.gridContext.canvas.height; y += gridHeight) {
      this.gridContext.moveTo(padding, y + padding);
      this.gridContext.lineTo(this.gridContext.canvas.width + padding, y + padding);
    }

    this.gridContext.strokeStyle = this.lineColour;
    this.gridContext.lineWidth = this.lineWidth;
    this.gridContext.stroke();
  }
}
