import {Injectable} from '@angular/core';
import {Token} from "../model/token.model";
import {Subject} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged = new Subject<Token[]>();
  selectedTokenId: number;

  tokens: Token[];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api`;
  tokenPath = 'token';

  constructor(private httpClient: HttpClient,
              private mapService: MapService) {
    this.tokens = [];
    this.getTokensFromServer();
  }

  public notifyTokenChanged() {
    return this.tokenChanged.next(this.tokens);
  }

  // Add Token
  public addToken(token: Token) {
    this.sendAddTokenToServer(token);
  }

  // Remove Token
  public removeToken() {
    if (this.selectedTokenId == null) return;
    const index = this.tokens.findIndex(i => i.id === this.selectedTokenId);
    if (index !== null) {
      this.sendRemoveTokenToServer(this.tokens[index]);
    }
  }

  // Move Token
  public moveToken(tokenId: number, x: number, y: number) {
    let token = this.tokens.find(i => i.id === tokenId);
    token.x = x;
    token.y = y;
    this.sendMoveTokenToServer(token);
  }

  public getTokensFromServer() {
    if (!this.mapService.mapId) {
      console.log('Not retrieving tokens, no map loaded');
      return;
    }

    console.debug(`getting tokens from server`);

    this.httpClient.get(`${this.serverPath}/${this.tokenPath}`)
      .subscribe(
        (response: Token[]) => {
          this.tokens = response;
          if (!this.tokens) {
            this.tokens = [];
          }
          this.notifyTokenChanged();
        },
        (error: HttpErrorResponse) => {
          console.error("Error getting tokens:");
          console.log(error);
        }
      );
  }

  private sendAddTokenToServer(token: Token) {
    console.debug(`add token to server`);

    this.httpClient.post(`${this.serverPath}/${this.tokenPath}`,
      {token},
      {})
      .subscribe(() => { console.log("Sent add token to server"); },
        (error: HttpErrorResponse) => {
          console.error("Error adding token:");
          console.log(error);
      });
  }

  private sendMoveTokenToServer(token: Token) {
    this.httpClient.put(`${this.serverPath}/${this.tokenPath}`,
      {token},
      {})
      .subscribe( () => {
        },
        (error: HttpErrorResponse) => {
          console.error("Error:");
          console.log(error);
      });
  }

  private sendRemoveTokenToServer(token: Token) {
    this.httpClient.delete(`${this.serverPath}/${this.tokenPath}/${token.id}`,
      {})
      .subscribe((response) => {
          console.log("Response from remove response", response);
        },
        (error: HttpErrorResponse) => {
        console.error("Error:");
        console.log(error);
      });
  }
}
