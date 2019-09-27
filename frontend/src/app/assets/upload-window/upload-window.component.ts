import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-upload-window',
  templateUrl: './upload-window.component.html',
  styleUrls: ['./upload-window.component.scss']
})
export class UploadWindowComponent implements OnInit {
  @Input() uploadState: string;

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
    console.log(`Uploading ${this.uploadState} ${this.imageFile.name}`);
    if (this.uploadState === 'token' || this.uploadState === 'background') {
      this.uploadService.uploadImages(this.imageFile.name,
        this.uploadState,
        this.imageFile,
        this.thumbnailFile);
    }
  }

  uploadDisabled(): boolean {
    return this.imageFile == null || this.thumbnailFile == null;
  }
}
