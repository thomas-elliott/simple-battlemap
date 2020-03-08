import {PagingArray} from "./pagingArray.model";
import {BattleMap} from "./battleMap.model";

export class MapListResponse {
  content: BattleMap[];
  page: PagingArray;
}
