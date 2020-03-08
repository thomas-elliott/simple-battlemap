import {PagingArray} from "./pagingArray.model";
import {Asset} from "./asset.model";

export class AssetsResponse {
  content: Asset[];
  page: PagingArray;
}
