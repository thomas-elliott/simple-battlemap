import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvasDiv', {static: false})
  canvasDiv: ElementRef;

  constructor() { }

  ngOnInit() { }

  private ngAfterViewInit(): void {
    this.updateScreenSize();
  }


  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    // TODO: Debounce the change by a bit
    this.updateScreenSize();
  }

  private updateScreenSize(): void {
    (<HTMLDivElement>this.canvasDiv.nativeElement).style.height = (window.innerHeight - 100).toString() + "px";
  }
}
