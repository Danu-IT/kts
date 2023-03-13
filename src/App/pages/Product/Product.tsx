import React, { FC, useEffect } from "react";

import Loader from "components/Loader";
import ProductItemStore from "store/ProductItemStore/ProductItemStore";
import { LoaderSize } from "type/index";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Card from "./components/Card";
import Related from "./components/Related/Related";
import styles from "./Product.module.scss";

const Product: FC = () => {
  const { id } = useParams();
  const productStore = useLocalStore(() => new ProductItemStore());

  useEffect(() => {
    productStore.getItem(String(id));
    window.scrollTo(0, 0);
  }, [id]);

  if (productStore.meta === Meta.loading) {
    return (
      <div className={styles.product__loader}>
        <Loader size={LoaderSize.l} />
      </div>
    );
  }

  if (productStore.meta === Meta.error || !productStore.product) {
    return <div>Произошла ошибка!</div>;
  }

  return (
    <div>
      {productStore.product && (
        <div className={styles.product__card}>
          <Card product={productStore.product}></Card>
          <h2 className={styles.product__related}>Related Product</h2>
          {productStore.product && (
            <Related product={productStore.product}></Related>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(Product);
