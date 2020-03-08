import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {WindowService} from "../service/window.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {WindowState} from "../model/windowState.model";
import {TokenWindowComponent} from "./token-window/token-window.component";

@Component({
  selector: 'window-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  iconSize: number = 64;

  @ViewChild('tokenWindow', {static: false})
  tokenWindow: TokenWindowComponent;

  deleteSubject: Subject<void> = new Subject<void>();
  pickSubject: Subject<void> = new Subject<void>();
  assetWindowSubscription: Subscription;

  showPage: WindowState;
  uploadState: string;

  constructor(private windowService: WindowService,
              public deleteDialog: MatDialog) { }

  // TODO: Need to learn how to do proper state and switching the windows in Angular
  ngOnInit() {
    this.assetWindowSubscription = this.windowService.assetWindowChanged.subscribe(
      (response) => {
        this.showPage = response;
      }
    );

    if (!this.showPage) {
      this.showPage = this.windowService.assetWindow;
    }
  }

  ngOnDestroy(): void {
    this.assetWindowSubscription.unsubscribe();
  }

  showToken(): boolean {
    return this.showPage == WindowState.AssetToken;
  }

  showBackground(): boolean {
    return this.showPage == WindowState.AssetBackground;
  }

  showUpload(): boolean {
    return this.showPage == WindowState.AssetUpload;
  }

  closeWindow() {
    this.windowService.changeWindow(WindowState.None);
  }

  zoomOut() {
    if (this.iconSize > 32) {
      this.iconSize = this.iconSize - 32;
    }
  }

  zoomIn() {
    if (this.iconSize < 128) {
      this.iconSize = this.iconSize + 32;
    }
  }

  clickDelete() {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent,
      {
        width: '50%',
        disableClose: false
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.tokenWindow.deleteAsset();
      this.deleteSubject.next();
    });
  }

  clickUpload() {
    if (this.showPage === WindowState.AssetUpload) {
      if (this.uploadState === 'token') {
        this.showPage = WindowState.AssetToken;
      } else if (this.uploadState === 'background') {
        this.showPage = WindowState.AssetBackground;
      }
    } else if (this.showPage === WindowState.AssetToken) {
      this.uploadState = 'token';
      this.showPage = WindowState.AssetUpload;
    } else if (this.showPage == WindowState.AssetBackground) {
      this.uploadState = 'background';
      this.showPage = WindowState.AssetUpload;
    }
  }

  clickPick() {
    this.pickSubject.next();
  }
}
