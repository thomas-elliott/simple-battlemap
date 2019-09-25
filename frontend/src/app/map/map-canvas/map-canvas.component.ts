import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss']
})
export class MapCanvasComponent implements OnInit {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

  @ViewChild('mapCanvas', {static: false})
  mapCanvas: ElementRef;

  public mapContext: CanvasRenderingContext2D;
  @Input() mapImageSource: number;

  constructor() { }

  ngOnInit() { }

  private ngAfterViewInit(): void {
    this.mapContext = (<HTMLCanvasElement>this.mapCanvas.nativeElement).getContext('2d');

    this.drawMap(`${this.serverPath}/image/${this.mapImageSource}/image.png`);
  }

  private drawMap(src: string) {
    console.log(`Drawing background from ${src}`);
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
