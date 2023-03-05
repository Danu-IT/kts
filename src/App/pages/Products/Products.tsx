import { useEffect, useState } from 'react'

import ListProducts from '@components/ListProducts'
import Loader from '@components/Loader'
import CategoriesStore from '@store/CategoriesStore'
import ProductsStore from '@store/ProductsStore/index'
import { useQueryParamsStore } from '@store/RootStore/hooks/useQueryParamsStore'
import { LoaderSize, Option } from '@type/index'
import { Meta } from '@utils/meta'
import { useLocalStore } from '@utils/useLocalStore'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'

import Search from './components/Search'
import Total from './components/Total'
import styles from './Products.module.scss'

const Products = () => {
  const [search, setSearch] = useState<string>('')
  const [filter, setFilter] = useState<Option[]>([])

  const [offset, setOffset] = useState<number>(0)

  const productsStore = useLocalStore(() => new ProductsStore())
  const categoriesStore = useLocalStore(() => new CategoriesStore())

  const handleFind = () => {
    setOffset(0)
    if (filter.length == 0) {
      productsStore.getAll(offset, search)
    }
  }

  useQueryParamsStore()

  useEffect(() => {
    if (filter.length == 0) {
      productsStore.getAll(offset, search)
    }
  }, [offset])

  useEffect(() => {
    if (filter.length !== 0) {
      productsStore.getFilter(filter[0], offset)
    }
  }, [filter, offset])

  useEffect(() => {
    categoriesStore.getCategories()
  }, [])

  if (productsStore.meta === Meta.loading && offset === 0) {
    return (
      <div className={styles.products__loader}>
        <Loader size={LoaderSize.l}></Loader>
      </div>
    )
  }

  return (
    <div className={styles.products}>
      <div className={styles.products__name}>
        <h1 className={styles.products__title}>Products</h1>
        <div className={styles.products__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
      </div>
      <Search
        className={styles.products__search}
        handleFind={handleFind}
        setFilter={setFilter}
        filter={filter}
        search={search}
        options={categoriesStore.categories}
        setSearch={setSearch}
      ></Search>
      <h1 className={styles.products__total}>
        Total Product
        <Total />
      </h1>
      <ListProducts
        data={productsStore.products}
        error={productsStore.meta === Meta.error && productsStore.meta}
      ></ListProducts>
      <InfiniteScroll
        dataLength={productsStore.products.length}
        next={() => setOffset((prev) => prev + productsStore.limit)}
        className={styles.products__scroll}
        hasMore={true}
        loader={
          productsStore.meta === Meta.loading && (
            <Loader size={LoaderSize.m}></Loader>
          )
        }
      >
        <></>
      </InfiniteScroll>
      {productsStore.products.length === 0 && <h1>Ничего не найдено</h1>}
    </div>
  )
}

export default observer(Products)
