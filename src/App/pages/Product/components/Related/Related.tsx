import React, { FC, useState, useEffect } from 'react'

import ListProducts from 'components/ListProducts'
import Loader from 'components/Loader'
import ProductsStore from 'store/ProductsStore/ProductsStore'
import { ProductData } from 'type/index'
import { API_ENDPOINTS } from 'utils/api'
import { Meta } from 'utils/meta'
import { observer, useLocalStore } from 'mobx-react-lite'

interface RelatedProps {
  product: ProductData
}

const limit = 4

const Related: FC<RelatedProps> = ({ product }) => {
  const productsStore = useLocalStore(() => new ProductsStore())

  useEffect(() => {
    productsStore.getFilter([product.category], limit)
  }, [])

  if (productsStore.metaFilter === Meta.loading) {
    return <Loader />
  }

  return <ListProducts data={productsStore.related}></ListProducts>
}

export default observer(Related)
