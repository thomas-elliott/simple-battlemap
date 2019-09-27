export class BattleMap {
  id: number;
  name: string;
  gridHeight: number;
  gridWidth: number;
  gridLineWidth: number;
  backgroundId: number;
  _links: {
    backgroundMap: string;
    tokens: string;
  }
}
