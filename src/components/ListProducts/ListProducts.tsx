import React, { FC } from "react";

import Card from "@components/Card";
import { ProductData } from "@type/index";
import { useNavigate } from "react-router-dom";

import styles from "./ListProducts.module.scss";

interface ListProductsProps {
  error: string;
  data: ProductData[];
}

const ListProducts: FC<ListProductsProps> = ({ error, data }) => {
  const navigate = useNavigate();

  const handleCard = (id: number) => {
    navigate(`/products/${id}`, { replace: true });
  };

  return (
    <div className={styles.cards}>
      {error ? (
        <div>Ошибка</div>
      ) : (
        data.map((product: ProductData) => (
          <Card
            onClick={() => handleCard(product.id)}
            key={product.id}
            subtitle={product.description}
            image={product.images}
            title={product.title}
            сategory={product.category.name}
            content={product.price}
          ></Card>
        ))
      )}
    </div>
  );
};

export default ListProducts;
