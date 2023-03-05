import { API_ENDPOINTS } from '@utils/api'
import { log } from '@utils/index'
import { Meta } from '@utils/meta'
import axios from 'axios'
import { makeObservable, observable, computed, action, runInAction } from 'mobx'

import { ProductData } from '../../type/index'
type PrivateFields = '_product' | '_meta'

export default class ProductItemStore {
  private _product: ProductData = {} as ProductData
  private _meta: Meta = Meta.initial

  constructor() {
    makeObservable<ProductItemStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      getItem: action,
    })
  }
  get product(): ProductData {
    return this._product
  }

  get meta(): Meta {
    return this._meta
  }

  async getItem(id: string) {
    this._meta = Meta.loading
    const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`)

    runInAction(() => {
      if (!response) {
        this._meta = Meta.error
        return
      }
      this._product = response.data
      this._meta = Meta.success
    })
  }
  destroy(): void {}
}
