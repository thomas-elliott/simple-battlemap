export class Token {
  id: number;
  name: string;
  imageSource: string;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(name: string, imageSource: string, width: number, height: number) {
    this.name = name;
    this.imageSource = imageSource;
    this.width = width;
    this.height = height;
  }
}
