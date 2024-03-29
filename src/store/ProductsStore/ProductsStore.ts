import rootStore from 'store/RootStore/instance'
import { Option, ProductData } from 'type/index'
import { API_ENDPOINTS } from 'utils/api'
import { Meta } from 'utils/meta'
import { ILocalStore } from 'utils/useLocalStore'
import axios from 'axios'

import {
  computed,
  makeObservable,
  observable,
  action,
  runInAction,
  IReactionDisposer,
  reaction,
} from 'mobx'

type PrivateFields =
  | '_products'
  | '_meta'
  | '_total'
  | '_metaFilter'
  | '_filteredProducts'
  | '_related'
  | '_offset'
  | '_search'
  | '_filter'

export default class ProductsStore implements ILocalStore {
  private _products: ProductData[] = []
  private _filteredProducts: ProductData[] = []
  private _related: ProductData[] = []
  _filter: Option[] = []

  _search: string = ''

  private _meta: Meta = Meta.initial
  private _metaFilter: Meta = Meta.initial

  private _limit: number = 10
  private _total: number = 0
  _offset: number = 0

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _filteredProducts: observable.ref,
      _related: observable.ref,
      _total: observable.ref,
      _filter: observable.ref,
      _search: observable,
      _offset: observable,
      _meta: observable,
      _metaFilter: observable,
      products: computed,
      filteredProducts: computed,
      meta: computed,
      metaFilter: computed,
      total: computed,
      related: computed,
      offset: computed,
      filter: computed,
      search: computed,
      limit: computed,
      getAll: action,
      getTotal: action,
      getFilter: action,
    })
  }

  get search(): string {
    return this._search
  }

  get filter(): Option[] {
    return this._filter
  }

  get limit(): number {
    return this._limit
  }

  get offset(): number {
    return this._offset
  }

  get total(): number {
    return this._total
  }

  get products(): ProductData[] {
    return this._products
  }

  get meta(): Meta {
    return this._meta
  }

  get metaFilter(): Meta {
    return this._metaFilter
  }

  get filteredProducts(): ProductData[] {
    return this._filteredProducts
  }

  get related(): ProductData[] {
    return this._related
  }

  getAll = async () => {
    this._meta = Meta.loading
    const response = await axios.get(
      `${API_ENDPOINTS.PRODUCTS}/?title=${this._search}`,
      {
        params: {
          limit: this._limit,
          offset: this._offset,
        },
      }
    )
    runInAction(() => {
      if (!response) {
        this._meta = Meta.error
        return
      }
      if (this._offset === 0) {
        this._products = []
      }
      this._products = [...this._products, ...response.data]
      if(this.search && this.filter){
        // this._products = [...this._filteredProducts]
        console.log(this._products)
      } 
      this._meta = Meta.success
    })
  }

  getFilter = async (filter: Option[], limit: number = this._limit) => {
    this._metaFilter = Meta.loading
    this._filteredProducts = []
    filter.forEach(async (item) => {
      const response = await axios.get(
        `${API_ENDPOINTS.CATEGORIES}/${item.id}/products`,
        {
          params: {
            offset: this._offset,
            limit: limit,
          },
        }
      )
      runInAction(() => {
        if (!response) {
          this._metaFilter = Meta.error
          return
        }
        if (this._offset === 0) {
          this._products = []
        }
        if (limit === 4) {
          this._related = [...response.data]
        }
        // console.log(item)
        if(!this.search){
          this._products = [...this._products, ...response.data]
        } else {
          this._filteredProducts = [...this._filteredProducts, ...response.data]
          // this.getAll()
          console.log(this._filteredProducts)
        }
        this._metaFilter = Meta.success
      })
    })
  }

  async getTotal() {
    this._meta = Meta.loading
    const response = await axios.get(API_ENDPOINTS.PRODUCTS)
    runInAction(() => {
      if (!response) {
        this._meta = Meta.error
        return
      }
      this._total = response.data.length
      this._meta = Meta.success
    })
  }

  destroy(): void {
    this._qpReaction()
    this._qpOffset()
    this._qpFilter()
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this.getAll()
    }
  )

  private readonly _qpOffset: IReactionDisposer = reaction(
    () => this.offset,
    (offset) => {
      if (offset === 0) {
        this._products = []
      }
    }
  )
  
  private readonly _qpFilter: IReactionDisposer = reaction(
    () => this.filter,
    () => {
      this._offset = 0
      this._products = []
    }

  )
}
