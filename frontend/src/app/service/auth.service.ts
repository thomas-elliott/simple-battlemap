import {Injectable} from '@angular/core';
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
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;
  authenticationChanged = new Subject<boolean>();

  authorised = false;
  private role: User;

  private sessionInfo: SessionInfo = null;
  sessionChanged = new Subject<SessionInfo>();
  private sessionList: SessionInfo[] = [];
  sessionListChanged = new Subject<SessionInfo[]>();

  constructor(private httpClient: HttpClient,
              private mapService: MapService) { }

  notifyAuthenticationChanged() {
    return this.authenticationChanged.next(this.authorised);
  }

  notifySessionListChanged() {
    return this.sessionListChanged.next(this.sessionList.slice());
  }

  updateSession(info: SessionInfo): void {
    if (this.sessionInfo != info) {
      console.debug(`Sending a session info notification`);
      this.sessionInfo = info;
      this.sessionChanged.next(this.sessionInfo);
      this.mapService.checkMapUpdate(this.sessionInfo.mapId);
    }
  }

  updateAuthentication(role: User) {
    if (!this.roleEqual(this.role, role)) {
      console.debug('Updating authentication ', this.role, role);
      this.role = role;
      this.authorised = true;
      this.notifyAuthenticationChanged();
    } else {
      console.debug(`Won't update authentication`);
    }
  }

  roleEqual(one: User, two: User) {
    if (one == null && two == null) return true;
    if (one == null || two == null) return false;

    if (one.username !== two.username) return false;

    return true;
  }

  public isPlayer(): boolean {
    if (this.role != null && this.role.authorities != null) {
      return (this.role.authorities.some(authority => authority.authority === 'PLAYER'));
    }
    return false;
  }

  public isDm(): boolean {
    if (this.role != null && this.role.authorities != null) {
      return (this.role.authorities.some(authority => authority.authority === 'DM'));
    }
    return false;
  }

  public currentSession() {
    return this.sessionInfo == null ? 'None' : this.sessionInfo.sessionId;
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
            this.getSession();
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
        console.debug(`Returned user info from response`, response);
      }
    )
  }

  hasSession(): boolean {
    return !(this.sessionInfo === null);
  }

  // Get current sessions
  getSessionList(): void {
    console.debug('Getting session list');
    this.httpClient.get(`${this.serverPath}/session/all`).subscribe(
      (response: SessionInfo[]) => {
        this.sessionList = response;
        this.notifySessionListChanged();
      }, () => {
        console.error('Error getting session list');
      }
    );
  }

  // Get current session
  getSession(): void {
    console.debug('Getting current session');
    this.httpClient.get(`${this.serverPath}/session`).subscribe(
      (response: SessionInfo) => {
        console.debug('Session info: ', response);
        this.updateAuthentication(response.player);
        this.updateSession(response);
      }, () => {
        console.error('Error getting current session');
      }
    );
  }

  newSession(): void {
    console.debug('Create new session');
    this.httpClient.post(`${this.serverPath}/session`, {}).subscribe(
      (response: SessionInfo) => {
        console.debug(response);
        this.updateSession(response);
      }, () => {
        console.error('Error creating new session');
      }
    );
  }

  loadSession(sessionId: number): void {
    this.httpClient.post(`${this.serverPath}/session/${sessionId}`, {}).subscribe(
      (response: SessionInfo) => {
        console.debug('Session loaded');
        this.updateSession(response);
      }, () => {
        console.error('Error loading session');
      }
    )
  }

  logout() {
    console.debug('logging out');
    this.httpClient.post(`${this.serverPath}/account/logout`, {}).subscribe(
      () => {
        console.debug('logged out');
        this.getSession();
      }, (error) => {
        console.error('Error logging out', error);
      }
    );
  }
}
