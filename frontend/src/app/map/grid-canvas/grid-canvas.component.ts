import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MapService} from "../../service/map.service";
import {Subscription} from "rxjs";
import {BattleMap} from "../../model/battleMap.model";

@Component({
  selector: 'app-grid-canvas',
  templateUrl: './grid-canvas.component.html',
  styleUrls: ['./grid-canvas.component.scss']
})
export class GridCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('gridCanvas')
  gridCanvas: ElementRef;

  private mapSubscription: Subscription;

  public gridContext: CanvasRenderingContext2D;

  // Grid settings
  @Input() lineColour: string;
  lineWidth: number;
  gridWidth: number;
  gridHeight: number;
  @Input() backgroundWidth: number;
  @Input() backgroundHeight: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapSubscription = this.mapService.mapChanged.subscribe(
      (map: BattleMap) => {
        this.loadSettingsFromMap(map);
      }
    );
  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
  }

  private loadSettingsFromMap(map: BattleMap) {
    if (map) {
      this.lineWidth = map.gridLineWidth;
      this.gridWidth = map.gridWidth;
      this.gridHeight = map.gridHeight;
    }
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  private ngAfterViewInit(): void {
    this.gridContext = (<HTMLCanvasElement>this.gridCanvas.nativeElement).getContext('2d');
    this.drawGrid(this.gridWidth, this.gridHeight);
  }

  private drawGrid(width, height) {
    console.log(`Updating grid. ${width}x${height} line width ${this.lineWidth}`);

    const padding = 0;

    this.gridContext.canvas.width = this.backgroundWidth;
    this.gridContext.canvas.height = this.backgroundHeight;

    this.gridContext.clearRect(0,0, this.backgroundWidth, this.backgroundHeight);

    if (this.lineWidth == 0) return;

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
