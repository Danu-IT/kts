import React, { useEffect, useState } from "react";

import ListProducts from "components/ListProducts";
import Loader from "components/Loader";
import CategoriesStore from "store/CategoriesStore";
import ProductsStore from "store/ProductsStore/index";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import { LoaderSize, Option } from "type/index";
import { Meta } from "utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import Search from "./components/Search";
import Total from "./components/Total";
import styles from "./Products.module.scss";

const Products = () => {
  useQueryParamsStoreInit();

  const [searchParams, setSearchParams] = useSearchParams("");

  const productsStore = useLocalStore(() => new ProductsStore());
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const handleFind = () => {
    productsStore._offset = 0;
    if (productsStore.filter.length == 0) {
      productsStore.getAll(productsStore.search);
    }
  };

  useEffect(() => {
    if (productsStore.filter.length == 0) {
      productsStore.getAll(productsStore.search);
    }
  }, [productsStore._filter, productsStore._offset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ search: productsStore.search });
      if (productsStore.filter.length == 0) {
        productsStore.getAll(productsStore.search);
      }
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
  }, [productsStore.search]);

  useEffect(() => {
    if (productsStore._filter.length !== 0) {
      productsStore.getFilter(productsStore._filter[0], productsStore._offset);
    }
  }, [productsStore._filter, productsStore._offset]);

  useEffect(() => {
    categoriesStore.getCategories();
    let searchParam = searchParams.get("search");
    if (searchParam === null) searchParam = "";
    productsStore._search = String(searchParam);
    handleFind();
  }, []);

  if (productsStore.meta === Meta.loading && productsStore._offset === 0) {
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
        handleFind={handleFind}
        setFilter={(answer) => (productsStore._filter = answer)}
        filter={productsStore.filter}
        search={productsStore.search}
        options={categoriesStore.categories}
        setSearch={(answer) => (productsStore._search = answer)}></Search>
      <h1 className={styles.products__total}>
        Total Product
        <Total />
      </h1>
      <ListProducts
        data={productsStore.products}
        error={
          productsStore.meta === Meta.error && productsStore.meta
        }></ListProducts>
      <InfiniteScroll
        dataLength={productsStore.products.length}
        next={() =>
          (productsStore._offset = productsStore.offset + productsStore.limit)
        }
        className={styles.products__scroll}
        hasMore={true}
        loader={
          productsStore.meta === Meta.loading && (
            <Loader size={LoaderSize.m}></Loader>
          )
        }>
        <></>
      </InfiniteScroll>
      {productsStore.products.length === 0 && <h1>Ничего не найдено</h1>}
    </div>
  );
};

export default observer(Products);
