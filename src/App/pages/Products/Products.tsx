import { useEffect, useState, useRef } from "react";

import Card from "@components/Card";
import ListProducts from "@components/ListProducts";
import Loader from "@components/Loader";
import { useApiGet } from "@hooks/useGetFetching";
import { ProductData, LoaderSize, Option } from "@type/index";
import { API_ENDPOINTS } from "@utils/api";
import { log } from "@utils/index";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Search from "./components/Search";
import Total from "./components/Total";
import styles from "./Products.module.scss";

type Props = {};

const Products = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option[]>([]);

  const [products, setProducts] = useState<ProductData[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(1);

  const [getProducts, error, loading] = useApiGet(async () => {
    const apiResponse = await axios.get(API_ENDPOINTS.PRODUCTS, {
      params: {
        limit: limit,
        offset: offset,
      },
    });

    const response = await apiResponse.data;
    if (offset === 1) {
      setProducts((prev) => [...response]);
    } else {
      setProducts((prev) => [...prev, ...response]);
    }
  });

  useEffect(() => {
    getProducts();
  }, [offset]);

  useEffect(() => {}, []);

  if (loading) {
    return (
      <div className={styles.products__loader}>
        <Loader size={LoaderSize.l}></Loader>
      </div>
    );
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
        setFilter={setFilter}
        filter={filter}
        search={search}
        setSearch={setSearch}
      ></Search>
      <h1 className={styles.products__total}>
        Total Product
        <Total />
      </h1>
      <ListProducts data={products} error={error}></ListProducts>
      <InfiniteScroll
        dataLength={products.length} //This is important field to render the next data
        next={() => setOffset((prev) => prev + 10)}
        hasMore={true}
        loader={<Loader size={LoaderSize.m}></Loader>}
      >
        <></>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
