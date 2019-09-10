import {Component, Input, OnInit} from '@angular/core';
import {AssetService} from "../../service/asset.service";
import {Subscription} from "rxjs";
import {Asset} from "../../model/asset.model";

@Component({
  selector: 'app-token-window',
  templateUrl: './token-window.component.html',
  styleUrls: ['./token-window.component.scss']
})
export class TokenWindowComponent implements OnInit {
  @Input() iconSize;
  assetSubscription: Subscription;

  tokens: Asset[];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetSubscription = this.assetService.tokenAssetsChanged.subscribe(
      (response: Asset[]) => {
        this.tokens = response;
      }
    );
    this.assetService.getTokenAssetsFromServer();
  }
}
