export class Token {
  id: number;
  name: string;
  imageAsset: number;
  assetId: number;
  player: number;
  x: number;
  y: number;

  constructor(name: string, imageAsset: number, player: number, x: number, y: number) {
    this.name = name;
    this.imageAsset = imageAsset;
    this.player = player;
    this.x = x;
    this.y = y;
  }
}
