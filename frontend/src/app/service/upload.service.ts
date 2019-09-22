import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Compressor from 'compressorjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;

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

  createThumbnail(image: File) {
    return new Promise<File>((complete, error) => {
      new Compressor(image, {
        quality: 0.7,
        maxWidth: 256,
        maxHeight: 256,

        success(result: File) {
          complete(result);
        },
        error(err) {
          console.error(err.message);
          error(null);
        }
      });
    });
  }
}
