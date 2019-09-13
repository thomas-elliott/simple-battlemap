import {Component} from '@angular/core';
import {WindowService} from "../../service/window.service";

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent {

  constructor(private windowService: WindowService) {}

  showAssets(assetType: string) {
    this.windowService.changeAssetWindow(assetType);
  }
}
