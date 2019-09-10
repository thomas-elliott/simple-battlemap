import {PagingArray} from "./pagingArray.model";
import {Asset} from "./asset.model";

export class AssetsResponse {
  _embedded: {
    assets: Asset[];
  };
  page: PagingArray;
}
