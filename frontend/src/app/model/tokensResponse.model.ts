import {PagingArray} from "./pagingArray.model";
import {Token} from "./token.model";

export class TokensResponse {
  _embedded: {
    tokens: Token[];
  };
  page: PagingArray;
}
