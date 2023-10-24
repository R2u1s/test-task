export type TBookCommon = {
  [key: string]: string | string[] | object[] | object;
}

export type TBookInfo = TBookCommon & {
  'volumeInfo'?: {
    'title': string;
    'authors': string[];
    'categories': string[];
    'imageLinks': {
      "smallThumbnail": string;
      "thumbnail": string;
      "small": string;
      "medium": string;
      "large": string;
      "extraLarge": string
    },
    [key: string]: string | string[] | object[] | object | number;
  };
}