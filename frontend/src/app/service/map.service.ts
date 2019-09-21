import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  serverPath = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  public saveMap() {
    console.log('save map');
    this.httpClient.post(`${this.serverPath}map/save`, {})
      .subscribe(() => {
        console.log('Finished saving map')
      }, () => {
        console.error('Error saving map');
      }
    )
  }
}
