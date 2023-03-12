export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type Option = {
  id: number
  name: string
}

export interface ProductData {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
    id: number
  }
}
