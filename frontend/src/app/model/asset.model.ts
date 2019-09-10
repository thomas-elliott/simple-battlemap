export class Asset {
  id: number;
  name: string;
  type: string;
  _links: {
    image: {
      href: string;
    }
    thumbnail: {
      href: string;
    }
  }
}
