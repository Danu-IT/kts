import { FC, useState, useEffect } from 'react'

import ListProducts from '@components/ListProducts'
import Loader from '@components/Loader'
import { useGetFetching } from '@hooks/useGetFetching'
import ProductsStore from '@store/ProductsStore/ProductsStore'
import { ProductData } from '@type/index'
import { API_ENDPOINTS } from '@utils/api'
import { Meta } from '@utils/meta'
import axios from 'axios'
import { observer, useLocalStore } from 'mobx-react-lite'

interface RelatedProps {
  product: ProductData
}

const limit = 4

const Related: FC<RelatedProps> = ({ product }) => {
  const productsStore = useLocalStore(() => new ProductsStore())

  useEffect(() => {
    productsStore.getFilter(product.category, 0, limit)
  }, [])

  if (productsStore.metaFilter === Meta.loading) {
    return <Loader></Loader>
  }

  return <ListProducts data={productsStore.related}></ListProducts>
}

export default observer(Related)
