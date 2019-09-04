import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss']
})
export class MapCanvasComponent implements OnInit {
  @ViewChild('mapCanvas', {static: false})
  mapCanvas: ElementRef;

  public mapContext: CanvasRenderingContext2D;
  @Input() mapImageSource: string;

  constructor() { }

  ngOnInit() { }

  private ngAfterViewInit(): void {
    this.mapContext = (<HTMLCanvasElement>this.mapCanvas.nativeElement).getContext('2d');

    this.drawMap(this.mapImageSource);
  }

  private drawMap(src: string) {
    let background = new Image();
    background.src = src;

    let ctx = this.mapContext;
    background.onload = () => {
      this.mapContext.canvas.width = background.width;
      this.mapContext.canvas.height = background.height;

      ctx.drawImage(background, 0, 0);
    };
  }
}
