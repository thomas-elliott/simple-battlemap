import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import {Subject} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverPath = 'http://localhost:8080/';
  authenticationChanged = new Subject<boolean>();

  authorised = false;

  constructor(private httpClient: HttpClient) { }

  notifyAuthenticationChanged() {
    return this.authenticationChanged.next(this.authorised);
  }

  checkAuthentication() {
    this.httpClient.get(`${this.serverPath}user`).subscribe(
      (response: User) => {
        if (this.authorised !== response.authenticated) {
          this.authorised = response.authenticated;
          this.notifyAuthenticationChanged();
        }
      }, (error: HttpErrorResponse) => {
        console.error('Error', error);
    }
    );
  }

  sendLogin(username: string, password: string) {
    const headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
      });
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return new Promise((resolve, reject) => {
      this.httpClient.post(this.serverPath + 'login',
        params.toString(),
        {headers: headers, responseType: "json"})
        .toPromise()
        .then(
          (response: HttpResponse<any>) => {
            this.authorised = true;
            this.notifyAuthenticationChanged();
            resolve('Authenticated');
          },
          (error: HttpErrorResponse) => {
            if (error.status !== 401) {
              console.error('Other error from authentication: ', error.status, error.message);
            }
            this.authorised = false;
            this.notifyAuthenticationChanged();
            reject('Failed auth');
          }
        )});
    }
}
