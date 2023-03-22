import React, { FC } from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  image: string[];
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  сategory?: string;
  onClick?: React.MouseEventHandler;
};

const Card: FC<CardProps> = ({
  image,
  subtitle,
  title,
  content,
  сategory,
  onClick,
}: CardProps) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}>
      <div>
        <img
          className={styles.card_img}
          src={image[0]}
          alt={сategory}
        />
        <div className={styles.card_сategory}>{сategory && сategory}</div>
        <div className={styles.card_name}>
          <h2 className={styles.card_title}>{title}</h2>
          <span className={styles.card_subtitle}>{subtitle}</span>
        </div>
      </div>
      <div className={styles.card_content}>${content}</div>
    </div>
  );
};

export default Card;
