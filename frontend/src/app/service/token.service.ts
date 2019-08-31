import { Injectable } from '@angular/core';
import {Token} from "../model/token.model";
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged = new Subject<Token[]>();

  tokens = new Array<Token>();

  constructor(private wsService: WebsocketService) { }

  notifyTokenChanged() {
    return this.tokenChanged.next(this.tokens);
  }

  // Add Token
  public addToken(name: string, image: string, x: number, y: number, width: number, height: number) {
    const token = new Token(name, image, width, height);
    token.x = x;
    token.y = y;
    token.id = this.tokens.push(token);
    this.notifyTokenChanged();
  }

  // Remove Token
  public removeToken(name: string) {
    const index = this.tokens.findIndex(i => i.name === name);
    if (index > -1) {
      this.tokens.splice(index, 1);
    } else {
      console.warn("Couldn't find index of " + name);
    }
    this.notifyTokenChanged();
  }

  // Move Token
  public moveToken(name: string, x: number, y: number) {
    let token = this.tokens.find(i => i.name === name);
    token.x = x;
    token.y = y;
    this.notifyTokenChanged();
  }
}
