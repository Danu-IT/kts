import React, { FC, useLayoutEffect, useState, useEffect } from "react";

import ListProducts from "@components/ListProducts";
import Loader from "@components/Loader";
import { useApiGet } from "@hooks/useGetFetching";
import { ProductData } from "@type/index";
import { API_ENDPOINTS } from "@utils/api";
import { log } from "@utils/index";
import axios from "axios";

interface RelatedProps {
  product: ProductData;
}

const Related: FC<RelatedProps> = ({ product }) => {
  // const [category, error_product, loading_product, refresh] = useApiGet(
  //   `${API_ENDPOINTS.CATEGORIES}/${product.category.id}/products`,
  //   limit
  // );

  const [realatedProduct, setRelatedProduct] = useState<ProductData[]>([]);
  let limit = 4;

  const [getProducts, error_product, loading_product] = useApiGet(async () => {
    const apiResponse = await axios.get(
      `${API_ENDPOINTS.CATEGORIES}/${product.category.id}/products`,
      {
        params: {
          limit: limit,
          offset: 0,
        },
      }
    );
    const response = await apiResponse.data;
    setRelatedProduct([...response]);
  });

  useEffect(() => {
    getProducts();
  }, []);

  if (loading_product) {
    return <Loader></Loader>;
  }

  return (
    <ListProducts data={realatedProduct} error={error_product}></ListProducts>
  );
};

export default Related;
