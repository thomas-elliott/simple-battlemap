import { Component, OnInit } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {WindowService} from "../service/window.service";
import {renderConstantPool} from "@angular/compiler-cli/ngcc/src/rendering/renderer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  iconSize: number = 128;

  deleteSubject: Subject<void> = new Subject<void>();
  pickSubject: Subject<void> = new Subject<void>();
  assetWindowSubscription: Subscription;

  showPage: string;

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
    if (this.showPage === "upload") {
      this.showPage = "token";
    } else {
      this.showPage = "upload"
    }
  }

  clickPick() {
    this.pickSubject.next();
  }

  closeWindow() {
    this.windowService.changeAssetWindow('');
  }
}
