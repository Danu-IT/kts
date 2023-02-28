import React from "react";

import { Route, Routes } from "react-router-dom";

import Product from "../../App/pages/Product";
import Products from "../../App/pages/Products";

type Props = {};

const publicRoutes = [
  { path: "/", component: Products },
  { path: "/products/:id", component: Product },
];

export const navRoutes = [
  { path: "/", name: "Products" },
  { path: "/categories", name: "Categories" },
  { path: "/aboutUs", name: "About Us" },
];

const Router = (props: Props) => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<Products />} />
    </Routes>
  );
};

export default Router;
