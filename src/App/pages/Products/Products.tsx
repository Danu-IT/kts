import { useEffect, useState } from "react";

import ListProducts from "@components/ListProducts";
import Loader from "@components/Loader";
import { useGetFetching } from "@hooks/useGetFetching";
import { ProductData, LoaderSize, Option } from "@type/index";
import { API_ENDPOINTS } from "@utils/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Search from "./components/Search";
import Total from "./components/Total";
import styles from "./Products.module.scss";

const Products = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option[]>([]);

  const [products, setProducts] = useState<ProductData[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const limit = 10;

  const [getProducts, error, loading] = useGetFetching(async () => {
    const apiResponse = await axios.get(API_ENDPOINTS.PRODUCTS, {
      params: {
        limit: limit,
        offset: offset,
      },
    });

    const response = await apiResponse.data;
    setProducts((prev) => [...prev, ...response]);
  });

  useEffect(() => {
    getProducts();
  }, [offset]);

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
        dataLength={products.length}
        next={() => setOffset((prev) => prev + limit)}
        hasMore={true}
        loader={<Loader size={LoaderSize.m}></Loader>}
      >
        <></>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
