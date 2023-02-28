import { useState, useEffect } from "react";

import { useGetFetching } from "@hooks/useGetFetching";
import { API_ENDPOINTS } from "@utils/api";
import axios from "axios";

import styles from "./Total.module.scss";

const Total = () => {
  const [total, setTotal] = useState<number>();

  const [getAllProducts] = useGetFetching(async () => {
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
