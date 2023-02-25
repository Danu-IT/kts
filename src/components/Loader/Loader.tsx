import { FC } from "react";

import { LoaderSize } from "@type/index";
import classNames from "classnames";

import styles from "./Loader.module.scss";

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
  color?: string;
};

const Loader: FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
  color,
}: LoaderProps) => {
  if (!loading) return null;
  let loader = classNames(styles.testClass);
  if (className) loader += className;
  if (size === "s") {
    loader = classNames(styles.testClass, styles.small);
  } else if (size === "l") {
    loader = classNames(styles.testClass, styles.large);
  }

  return (
    <div
      style={{
        borderColor: color ? color : "",
        borderBottomColor: "transparent",
      }}
      className={loader}
    ></div>
  );
};

export default Loader;
