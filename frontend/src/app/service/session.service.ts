import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SessionInfo} from "../model/sessionInfo.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;

  private sessionInfo = null;
  sessionChanged = new Subject<SessionInfo>();

  constructor(private httpClient: HttpClient) {}

  updateSession(info): void {
    console.debug(`Updating info: ${info}`);
    if (this.sessionInfo != info) {
      console.debug(`Sending an info notification ${info}`);
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
}
