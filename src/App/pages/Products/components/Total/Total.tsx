import React, { useEffect } from "react";

import ProductsStore from "store/ProductsStore";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./Total.module.scss";

const Total = () => {
  const totalStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    totalStore.getTotal();
  }, []);

  return <span className={styles.total}>{totalStore.total}</span>;
};

export default observer(Total);
