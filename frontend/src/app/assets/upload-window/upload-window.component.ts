import { Component, OnInit } from '@angular/core';
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-upload-window',
  templateUrl: './upload-window.component.html',
  styleUrls: ['./upload-window.component.scss']
})
export class UploadWindowComponent implements OnInit {
  imageFile: File;
  thumbnailFile: File;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {}

  imageFileChanged(event): void {
    this.imageFile = event.target.files[0];
    this.uploadService.createThumbnail(this.imageFile).then(
      (response: File) => {
        this.thumbnailFile = response;
      }
    );
  }

  upload(): void {
    this.uploadService.uploadImages(this.imageFile.name,
      "token",
      this.imageFile,
      this.thumbnailFile);
  }

  uploadDisabled(): boolean {
    return this.imageFile == null || this.thumbnailFile == null;
  }
}
