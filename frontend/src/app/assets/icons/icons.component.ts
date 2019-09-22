import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'asset-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnChanges {
  @Input() id: number;
  @Input() size: number;
  @Input() selected: boolean;
  isSelected: boolean;

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selected' in changes) {
      // Why is this needed?
      this.isSelected = (changes.selected.currentValue == 'true');
    }
  }
}
