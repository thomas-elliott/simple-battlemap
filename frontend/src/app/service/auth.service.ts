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
import {SessionInfo} from "../model/sessionInfo.model";
import {RegistrationRequest} from "../model/registrationRequest.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;
  authenticationChanged = new Subject<boolean>();

  authorised = false;
  role: User;

  private sessionInfo: SessionInfo = null;
  sessionChanged = new Subject<SessionInfo>();

  constructor(private httpClient: HttpClient) { }

  notifyAuthenticationChanged() {
    return this.authenticationChanged.next(this.authorised);
  }

  public isPlayer(): boolean {
    if (this.role == null) return false;
    return !this.role.dm;
  }

  public isDm(): boolean {
    if (this.role == null) return false;
    return this.role.dm;
  }

  public currentSession() {
    return this.sessionInfo == null ? 'None' : this.sessionInfo.id;
  }

  checkAuthentication() {
    this.httpClient.get(`${this.serverPath}/account/user`).subscribe(
      (response: User) => {
        this.role = response;
        this.authorised = true;
        this.notifyAuthenticationChanged();
      }, (error: HttpErrorResponse) => {
        console.error('Error checking authentication', error);
        this.authorised = false;
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

  registerAccount(info: RegistrationRequest): void {
    this.httpClient.post(`${this.serverPath}/account/register`, info).subscribe(
      (response: User) => {
        console.log(`Returned user info from response`);
        console.log(response);
      }
    )
  }

  updateSession(info): void {
    console.debug(`Updating info:`);
    console.debug(info);
    if (this.sessionInfo != info) {
      console.debug(`Sending an info notification`);
      this.sessionInfo = info;
      this.sessionChanged.next(this.sessionInfo)
    }
  }

  hasSession(): boolean {
    return !(this.sessionInfo === null);
  }

  // Get current sessions
  getSessionList(): void {
    console.debug('Getting session list');
    this.httpClient.get(`${this.serverPath}/session/all`).subscribe(
      (response: SessionInfo[]) => {
        console.debug(response);
      }, () => {
        console.error('Error getting session list');
      }
    );
  }

  // Get current session
  getSession(): void {
    console.debug('Getting current session');
    this.httpClient.get(`${this.serverPath}/session/`).subscribe(
      (response: SessionInfo) => {
        console.debug(response);
        this.updateSession(response);
      }, () => {
        console.error('Error getting current session');
      }
    );
  }

  newSession(): void {
    console.debug('Create new session');
    this.httpClient.post(`${this.serverPath}/session/`, {}).subscribe(
      (response: SessionInfo) => {
        console.debug(response);
        this.updateSession(response);
      }, () => {
        console.error('Error creating new session');
      }
    );
  }

  loadSession(): void {

  }

  logout() {
    this.httpClient.post(`${this.serverPath}/account/logout`, {});
  }
}
