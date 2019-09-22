import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {WindowService} from "../service/window.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {WindowState} from "../model/windowState.model";

@Component({
  selector: 'window-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  iconSize: number = 128;

  deleteSubject: Subject<void> = new Subject<void>();
  pickSubject: Subject<void> = new Subject<void>();
  assetWindowSubscription: Subscription;

  showPage: WindowState;

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
    this.windowService.changeAssetWindow(WindowState.None);
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
      console.log("Closed: " + result);
      this.deleteSubject.next();
    });
  }

  clickUpload() {
    if (this.showPage === WindowState.AssetUpload) {
      this.showPage = WindowState.AssetToken;
    } else if (this.showPage === WindowState.AssetToken) {
      this.showPage = WindowState.AssetUpload;
    }
  }

  clickPick() {
    this.pickSubject.next();
  }
}
