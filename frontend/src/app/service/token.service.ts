import {Injectable} from '@angular/core';
import {Token} from "../model/token.model";
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TokensResponse} from "../model/tokensResponse.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged = new Subject<Token[]>();
  selectedTokenId: number;

  tokens: Token[];

  serverPath = `${environment.serverProtocol}://${environment.serverBase}/api/`;
  tokenPath = 'token/';

  constructor(private wsService: WebsocketService,
              private httpClient: HttpClient) {
    this.tokens = [];
    this.getTokensFromServer();
  }

  notifyTokenChanged() {
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
    this.httpClient.get(this.serverPath + 'data/tokens')
      .subscribe(
        (response: TokensResponse) => {
          this.tokens = response._embedded.tokens;
          if (!this.tokens) {
            this.tokens = [];
          }
          this.notifyTokenChanged();
        },
        (error: HttpErrorResponse) => {
          console.error("Error:");
          console.log(error);
        }
      );
  }

  private sendAddTokenToServer(token: Token) {
    this.httpClient.post(this.serverPath + this.tokenPath + 'add',
      {token},
      {})
      .subscribe((response) => { console.log("Finish"); },
        (error: HttpErrorResponse) => {
          console.error("Error:");
          console.log(error);
      });
  }

  private sendMoveTokenToServer(token: Token) {
    this.httpClient.put(this.serverPath + this.tokenPath + 'move',
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
    this.httpClient.delete(this.serverPath + this.tokenPath + 'remove/' + token.id,
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
