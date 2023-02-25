import React, { useState, useEffect } from "react";

import axios from "axios";

import styles from "./Total.module.scss";
import { useApiGet } from "../../../../../hooks/useGetFetching";
import { API_ENDPOINTS } from "../../../../../utils/api";
type Props = {};

const Total = (props: Props) => {
  const [total, setTotal] = useState<number>();
  const [getAllProducts, error, loading] = useApiGet(async () => {
    const apiResponse = await axios.get(API_ENDPOINTS.PRODUCTS);
    const response = await apiResponse.data;
    setTotal(response.length);
  });
  useEffect(() => {
    getAllProducts();
  }, []);
  return <span className={styles.total}>{total}</span>;
};

export default Total;
