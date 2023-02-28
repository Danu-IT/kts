export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    name: string;
    id: number;
  };
}
