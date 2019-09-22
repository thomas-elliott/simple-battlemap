import {Injectable} from '@angular/core';
import {Token} from "../model/token.model";
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TokensResponse} from "../model/tokensResponse.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged = new Subject<Token[]>();

  tokens: Token[];

  serverPath = 'http://localhost:8080/';
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
  public removeToken(name: string) {
    const index = this.tokens.findIndex(i => i.name === name);
    if (index > -1) {
      this.tokens.splice(index, 1);
    } else {
      console.warn("Couldn't find index of " + name);
    }
    this.sendRemoveTokenToServer(this.tokens[index]);
  }

  // Move Token
  public moveToken(name: string, x: number, y: number) {
    let token = this.tokens.find(i => i.name === name);
    token.x = x;
    token.y = y;
    this.sendMoveTokenToServer(token);
  }

  public getTokensFromServer() {
    this.httpClient.get(this.serverPath + 'data/tokens')
      .subscribe(
        (response: TokensResponse) => {
          console.log('Token response from server');
          this.tokens = response._embedded.tokens;
          if (!this.tokens) {
            this.tokens = [];
          }
          console.log(this.tokens);
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
      .subscribe( (response) => {

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
