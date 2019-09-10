import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'asset-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() id: number;
  @Input() size: number;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
  }
}
