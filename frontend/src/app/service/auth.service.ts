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
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;
  authenticationChanged = new Subject<boolean>();

  authorised = false;
  role: User;

  constructor(private httpClient: HttpClient) { }

  notifyAuthenticationChanged() {
    return this.authenticationChanged.next(this.authorised);
  }

  private hasAuthority(authority: string): boolean {
    if (!this.role) return false;
    for (let auth of this.role.authorities) {
      if (auth.authority === authority) {
        return true;
      }
    }
    return false;
  }

  public isPlayer(): boolean {
    return this.hasAuthority('ROLE_PLAYER');
  }

  public isDm(): boolean {
    return this.hasAuthority('ROLE_DM');
  }

  checkAuthentication() {
    this.httpClient.get(`${this.serverPath}/account/user`).subscribe(
      (response: User) => {
        this.role = response;
        if (this.authorised !== response.authenticated) {
          this.authorised = response.authenticated;
        }
        this.notifyAuthenticationChanged();
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
      this.httpClient.post(`${this.serverPath}/login`,
        params.toString(),
        {headers: headers, responseType: "json"})
        .toPromise()
        .then(
          (response: HttpResponse<any>) => {
            this.authorised = true;
            this.checkAuthentication();
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
