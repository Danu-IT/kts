import { Option } from 'type/index'
import { API_ENDPOINTS } from 'utils/api'
import { log } from 'utils/index'
import { Meta } from 'utils/meta'
import axios from 'axios'

import { makeObservable, observable, computed, runInAction, action } from 'mobx'

import { ILocalStore } from '../../utils/useLocalStore'

type PrivateFields = '_categories' | '_meta'

export default class CategoriesStore implements ILocalStore {
  private _categories: Option[] = []
  private _meta: Meta = Meta.initial

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      categories: computed,
      meta: computed,
      getCategories: action,
    })
  }

  get categories(): Option[] {
    return this._categories
  }

  get meta(): Meta {
    return this._meta
  }

  async getCategories() {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES, {
      params: {
        limit: 10,
      },
    })
    runInAction(() => {
      if (!response) {
        this._meta = Meta.error
        return
      }

      this._categories = [...response.data]
      this._meta = Meta.success
    })
  }

  destroy(): void {}
}
