import { Injectable } from '@angular/core';
import {Token} from "../model/token.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged = new Subject<Token[]>();

  tokens = new Array<Token>();

  constructor() { }

  notifyTokenChanged() {
    return this.tokenChanged.next(this.tokens);
  }

  // Add Token
  public addToken(image: string, x: number, y: number, width: number, height: number) {
    const name = "TestToken";
    const token = new Token(name, image, width, height);
    token.x = x;
    token.y = y;
    token.id = this.tokens.push(token);
    this.notifyTokenChanged();
  }

  // Remove Token
  public removeToken(id: number) {
    const index = this.tokens.findIndex(i => i.id === id);
    if (index > -1) {
      this.tokens.splice(index, 1);
    } else {
      console.warn("Couldn't find index of " + id);
    }
    this.notifyTokenChanged();
  }

  // Move Token
  public moveToken(id: number, x: number, y: number) {
    let token = this.tokens.find(i => i.id === id);
    token.x = x;
    token.y = y;
    this.notifyTokenChanged();
  }
}
