export class BattleMap {
  id: number;
  gridHeight: number;
  gridWidth: number;
  backgroundId: number;
  _links: {
    backgroundMap: string;
    tokens: string;
  }
}
