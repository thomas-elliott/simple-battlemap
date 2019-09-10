import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  serverPath = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  uploadImages(name: string, type: string, image: File, thumbnail: File) {
    let uploadData = new FormData();
    uploadData.append('name', name);
    uploadData.append('type', type);
    uploadData.append('imageFile', image, image.name);
    uploadData.append('thumbnailFile', thumbnail, image.name);
    this.httpClient.post(this.serverPath + 'asset', uploadData)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      )
  }
}
