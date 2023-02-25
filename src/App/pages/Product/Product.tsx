import React, { FC, useState } from "react";
import { useEffect } from "react";

import Loader from "@components/Loader";
import { useApiGet } from "@hooks/useGetFetching";
import { LoaderSize, ProductData } from "@type/index";
import { API_ENDPOINTS } from "@utils/api";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "./components/Card";
import Related from "./components/Related/Related";
import styles from "./Product.module.scss";

interface ProductProps {}

const Product: FC<ProductProps> = ({}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData>();

  const [getProducts, error_product, loading_product] = useApiGet(async () => {
    const apiResponse = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    setProduct(apiResponse.data);
  });

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading_product) {
    return (
      <div className={styles.product__loader}>
        <Loader size={LoaderSize.l}></Loader>
      </div>
    );
  }

  return (
    <div>
      {product && (
        <div className={styles.product__card}>
          <Card product={product}></Card>
          <h2 className={styles.product__related}>Related Product</h2>
          {product && <Related product={product}></Related>}
        </div>
      )}
    </div>
  );
};

export default Product;
