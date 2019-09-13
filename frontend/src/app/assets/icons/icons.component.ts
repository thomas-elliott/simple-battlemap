import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selected' in changes) {
      // Why is this needed?
      this.isSelected = (changes.selected.currentValue == 'true');
    }
  }
}
