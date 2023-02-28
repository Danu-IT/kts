import { FC, useState, useEffect } from "react";

import ListProducts from "@components/ListProducts";
import Loader from "@components/Loader";
import { useGetFetching } from "@hooks/useGetFetching";
import { ProductData } from "@type/index";
import { API_ENDPOINTS } from "@utils/api";
import axios from "axios";

interface RelatedProps {
  product: ProductData;
}

const limit = 4;

const Related: FC<RelatedProps> = ({ product }) => {
  const [realatedProduct, setRelatedProduct] = useState<ProductData[]>([]);

  const [getProducts, error_product, loading_product] = useGetFetching(
    async () => {
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
    }
  );

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
