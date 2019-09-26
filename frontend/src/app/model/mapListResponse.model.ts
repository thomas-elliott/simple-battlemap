import {PagingArray} from "./pagingArray.model";
import {BattleMap} from "./battleMap.model";

export class MapListResponse {
  _embedded: {
    battleMaps: BattleMap[];
  };
  page: PagingArray;
}
