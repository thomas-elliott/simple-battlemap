export class Asset {
  id: number;
  name: string;
  type: string;
  selected: boolean;
  _links: {
    image: {
      href: string;
    }
    thumbnail: {
      href: string;
    }
  }
}
